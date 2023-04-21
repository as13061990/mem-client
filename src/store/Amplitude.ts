import amplitude  from 'amplitude-js';

class Amplitude {
  private active: boolean;
  private amplitude: any;

  constructor () {
    this.amplitude = amplitude;
    this.init();
  }

  private init(): void {
    this.amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
    this.active = this.amplitude.getInstance()._isInitialized;
    if (!this.active) return;
    const identify = new this.amplitude.Identify()
      .setOnce('version', '1.0');
    this.amplitude.getInstance().identify(identify);
  }

  public track(ad_type: 'reward' | 'interstitial'): void {
    this.amplitude.getInstance().logEvent('watched_ad', {ad_type: ad_type});
  }

}

export default Amplitude;