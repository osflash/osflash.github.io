import 'styled-components';
import defaultTheme from '~/themes/light';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: typeof defaultTheme.title;
    colors: typeof defaultTheme.colors;
  }
}
