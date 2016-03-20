# angular2-twitter-share-button

[![npm version](https://badge.fury.io/js/angular2-twitter-share-button.svg)](https://badge.fury.io/js/angular2-twitter-share-button)

# Usage

```
$ npm i -S angular2-twitter-share-button
```

```ts
import {Component} from "angular2/core";
import {TwitterShareButtonComponent} from "angular2-twitter-share-button";

@Component({
    selector: "some-component",
    template: `
        <twitter-share-button></twitter-share-button>
    `,
    directives: [TwitterShareButtonComponent]
export class SomeComponent {
}
```