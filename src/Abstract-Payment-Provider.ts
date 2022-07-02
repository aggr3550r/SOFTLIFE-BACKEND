import { randomInt } from 'crypto';
import { User } from './modules/users/entities/user.entity';

export default abstract class AbstractPaymentProvider {
  /**
   * We process and store monetary value in naira by default. Any provider that needs the transaction amount to be sent in kobo will need to use this method
   * @param amountInNaira
   * @returns amountInKobo
   */
  convertNairaToKobo(amountInNaira: number) {
    const amountInKobo = amountInNaira * 100;
    return amountInKobo;
  }

  generateTransactionReference() {
    let ref = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${this.getRefPrefix()}_${ref}_${randomInt(8)}`;
  }

  currencyList(): string[] {
    return ['NGN'];
  }

  isSupportedCurrency(currencyCode: string) {
    return this.currencyList().includes(currencyCode);
  }

  protected abstract getInitiator(email: string): Promise<User>;

  protected abstract getRefPrefix(): string;
}
