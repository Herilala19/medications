"use client";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components";
import {
  createDrugSchema,
  updateDrugSchema,
  type CreateDrugFormData,
  type UpdateDrugFormData,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const FREQUENCY_UNITS = [
  { value: "HOURS", label: "Hourly" },
  { value: "DAYS", label: "Daily" },
  { value: "WEEKS", label: "Weekly" },
];

interface DrugFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<CreateDrugFormData>;
  onSubmit: (data: CreateDrugFormData | UpdateDrugFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const DrugForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: DrugFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateDrugFormData | UpdateDrugFormData>({
    resolver: zodResolver(
      mode === "create" ? createDrugSchema : updateDrugSchema,
    ) as any,
    defaultValues,
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Drug Name"
              placeholder="e.g., Aspirin"
              {...register("name")}
              error={errors.name?.message}
              disabled={isSubmitting || isLoading}
            />

            <Input
              label="Dosage"
              placeholder="e.g., 500mg"
              {...register("dosage")}
              error={errors.dosage?.message}
              disabled={isSubmitting || isLoading}
            />

            <Input
              label="Unit"
              placeholder="e.g., mg, ml, tablets"
              {...register("unit")}
              error={errors.unit?.message}
              disabled={isSubmitting || isLoading}
            />

            <div className="md:col-span-2">
              <Input
                label="Description (Optional)"
                placeholder="Enter drug description or notes"
                {...register("description")}
                error={errors.description?.message}
                disabled={isSubmitting || isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Information */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Frequency"
              type="number"
              placeholder="e.g., 2"
              {...register("frequency", { valueAsNumber: true })}
              error={errors.frequency?.message}
              disabled={isSubmitting || isLoading}
            />

            <Controller
              name="frequencyUnit"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting || isLoading}
                >
                  <SelectTrigger
                    label="Frequency Unit"
                    error={errors.frequencyUnit?.message}
                  >
                    <SelectValue placeholder="Select frequency unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_UNITS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              label="Start Date"
              type="date"
              {...register("startDate")}
              error={errors.startDate?.message}
              disabled={isSubmitting || isLoading}
            />

            <Input
              label="End Date (Optional)"
              type="date"
              {...register("endDate")}
              error={errors.endDate?.message}
              disabled={isSubmitting || isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting || isLoading}
          className="cursor-pointer"
        >
          {isSubmitting || isLoading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Drug"
            : "Update Drug"}
        </Button>
      </div>
    </form>
  );
};
