import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() match: MatchResults;
  ws: WebSocket = null;

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '';
  }

  async componentWillLoad() {
    console.log('componentWillLoad');
    const wsOrigin = location.origin.replace(/^http/, 'ws');
    this.ws = new WebSocket(`${wsOrigin}/open`);
    console.log('created ws');
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  private onOpen(e) {
    console.log('ws open', e);
    window.setInterval(this.onPing.bind(this), 2000);
    window.setTimeout(this.onRandomMessage.bind(this), 1000);
  }

  private onPing() {
    console.log('ws ping');
    this.ws.send('ping');
  }

  private onMessage(e) {
    console.log('ws message', e.data);
  }

  private onError(e) {
    console.log('ws error', e);
  }

  private onClose(e) {
    console.log('ws close', e);
  }

  private onRandomMessage() {
    console.log('ws random message');
    this.ws.send('random message');
  }

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <p>Hello! My name is {this.normalize(this.match.params.name)}. My name was passed in through a route param!</p>
        </div>
      );
    }
  }
}
