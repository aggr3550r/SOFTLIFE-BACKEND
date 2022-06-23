import { randomInt } from 'crypto';

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
    return `${this.getProviderPrefix()}_${ref}_${randomInt(8)}`;
  }

  currencyList(): string[] {
    return ['NGN'];
  }

  isSupportedCurrency(currencyAbbr: string) {
    return this.currencyList().includes(currencyAbbr);
  }

  protected abstract getProviderPrefix(): string;
}