///<reference path="../typings/jasmine/jasmine.d.ts"/>

import {TwitterShareButtonComponent} from "../src/angular2-twitter-share-button.component";

import {Component, ViewChild} from "angular2/core";
import {TestComponentBuilder, describe, it, injectAsync, expect} from "angular2/testing";


describe("TwitterShareButtonComponent", ()=> {

    it("initialize", injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
            .then(fixture => {
                expect(fixture.elementRef).toBeTruthy();
            });
    }));

    it("load event", injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
            .then(fixture => {
                fixture.detectChanges();
                return new Promise(resolve => {
                    setTimeout(() => {
                        let cmp = fixture.componentInstance as TestComponent;
                        cmp.child.loadWidget().then(() => {
                            expect(cmp.loaded).toBe(true);
                            expect(fixture.nativeElement.getElementsByTagName("iframe")[0]).toBeDefined();
                            
                            resolve();
                        });
                    }, 500);
                });
            });
    }));
});


@Component({
    selector: "test-component",
    template: `<twitter-share-button [text]="'test'" (load)="onLoad()"></twitter-share-button>`,
    directives: [TwitterShareButtonComponent]
})
class TestComponent {
    loaded: boolean;

    @ViewChild(TwitterShareButtonComponent) child: TwitterShareButtonComponent;

    onLoad() {
        this.loaded = true;
    }
}