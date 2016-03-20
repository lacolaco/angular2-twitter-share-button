import "reflect-metadata";

import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from "angular2/platform/testing/browser";
import {BrowserDomAdapter} from "angular2/src/platform/browser/browser_adapter";
import {setBaseTestProviders} from "angular2/testing";

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
BrowserDomAdapter.makeCurrent();

import "./src/angular2-twitter-share-button.component.spec";