import { NumberInput, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import { useMutateIncome } from '@/hooks/useMutateIncome';
import type { CreateIncomeInput } from '@/schemas/income';
import { createIncomeSchema } from '@/schemas/income';

export const AddIncomeForm = () => {
  const { createIncomeMutation } = useMutateIncome();

  const form = useForm<CreateIncomeInput>({
    initialValues: {
      name: '',
      description: '',
      amount: 0,
      date: dayjs().toDate(),
    },
    validate: zodResolver(createIncomeSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createIncomeMutation.mutate(values);
        form.reset();
      })}
    >
      <TextInput label="Name" {...form.getInputProps('name')} withAsterisk />
      <TextInput
        mt="sm"
        label="Description"
        {...form.getInputProps('description')}
      />
      <NumberInput
        mt="sm"
        label="Amount"
        min={0.01}
        step={0.01}
        precision={2}
        withAsterisk
        {...form.getInputProps('amount')}
      />
      <DatePicker
        mt="sm"
        label="Date"
        inputFormat="YYYY MMM DD"
        withAsterisk
        {...form.getInputProps('date')}
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-sky-400 p-2 text-center text-sm font-bold text-white shadow hover:bg-sky-500 focus:ring-2 focus:ring-sky-500/30"
      >
        Save
      </button>
    </form>
  );
};
