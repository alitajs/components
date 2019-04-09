import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'alita-first',
  styleUrl: 'first-component.less',
  shadow: true,
})
export class FirstComponent {
  /**
   * The name
   */
  @Prop() name: string;

  render() {
    return (
      <div>
        Hello, <span class="alita-first">{this.name}</span> !
      </div>
    );
  }
}
