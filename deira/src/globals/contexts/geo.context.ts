import { Global, Injectable, Module, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class GovernorateContext {
  private governorate: number;

  constructor() {}

  get(): number | undefined {
    return this.governorate;
  }

  set(governorate: number) {
    this.governorate = governorate;
  }
}

@Global()
@Module({
  providers: [GovernorateContext],
  exports: [GovernorateContext],
})
export class GovernorateContextModule {}
