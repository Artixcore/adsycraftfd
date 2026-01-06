'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCampaign, useAdAccounts } from '@/features/ads/hooks/useCampaigns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CAMPAIGN_OBJECTIVES } from '@/lib/utils/constants';
import { useQueryClient } from '@tanstack/react-query';

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  objective: z.enum(['TRAFFIC', 'LEADS', 'MESSAGES', 'ENGAGEMENT']),
  adAccountId: z.string().min(1, 'Ad account is required'),
  budgetCap: z.number().optional(),
  dailyBudget: z.number().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface CampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metaAccountId: string;
}

export function CampaignWizard({ open, onOpenChange, metaAccountId }: CampaignWizardProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const { data: adAccounts } = useAdAccounts();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  const createMutation = useCreateCampaign();

  const onSubmit = async (data: CampaignFormData) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        metaAccountId,
      });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      onOpenChange(false);
      setStep(1);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
          <DialogDescription>Step {step} of 5</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select
                  onValueChange={(value) => setValue('objective', value as any)}
                  defaultValue={watch('objective')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPAIGN_OBJECTIVES.map((obj) => (
                      <SelectItem key={obj} value={obj}>
                        {obj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.objective && (
                  <p className="text-sm text-destructive">{errors.objective.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adAccountId">Ad Account</Label>
                <Select
                  onValueChange={(value) => setValue('adAccountId', value)}
                  defaultValue={watch('adAccountId')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ad account" />
                  </SelectTrigger>
                  <SelectContent>
                    {adAccounts?.map((account: any) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name || account.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.adAccountId && (
                  <p className="text-sm text-destructive">{errors.adAccountId.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budgetCap">Budget Cap (Optional)</Label>
                <Input
                  id="budgetCap"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('budgetCap', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyBudget">Daily Budget (Optional)</Label>
                <Input
                  id="dailyBudget"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('dailyBudget', { valueAsNumber: true })}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register('startDate')} />
                {errors.startDate && (
                  <p className="text-sm text-destructive">{errors.startDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input id="endDate" type="date" {...register('endDate')} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="My Campaign" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold">Review</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <div>Objective: {watch('objective')}</div>
                  <div>Budget: {watch('budgetCap') ? `$${watch('budgetCap')}` : 'N/A'}</div>
                  <div>Start: {watch('startDate')}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              {step < 5 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Campaign'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
