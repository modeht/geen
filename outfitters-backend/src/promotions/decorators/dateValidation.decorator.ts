import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEndDateAfterStartDate(startDateProperty: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEndDateAfterStartDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [startDateProperty],
      options: validationOptions,
      validator: {
        validate(endDate: Date | string, args: ValidationArguments) {
          const startDate = (args.object as any)[args.constraints[0]];
          const parsedEndDate = new Date(endDate);
          const parsedStartDate = new Date(startDate);

          return !isNaN(parsedEndDate.getTime()) &&
                 !isNaN(parsedStartDate.getTime()) &&
                 parsedEndDate > parsedStartDate;
        },
        defaultMessage(args: ValidationArguments) {
          const endDate = args.value as Date;
          const startDate = (args.object as any)[args.constraints[0]];

          return `The end date (${endDate.toISOString()}) must be after the start date (${new Date(startDate).toISOString()})`;
        },
      },
    });
  };
}

export function IsEndDateAfterToday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEndDateAfterToday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(endDate: Date | string) {
          const parsedEndDate = new Date(endDate);
          return !isNaN(parsedEndDate.getTime()) && parsedEndDate > new Date();
        },
        defaultMessage(args: ValidationArguments) {
          const endDate = args.value;
          return `The end date (${endDate}) must be after the current date (${new Date().toISOString()})`;
        },
      },
    });
  };
}

  
