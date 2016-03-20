import {
    Component, ChangeDetectionStrategy, ElementRef, Renderer, Input, Output, OnChanges, EventEmitter
} from "angular2/core";

interface ShareButtonOptions {
    text?: string;
    hashtags?: string;
    via?: string;
    related?: string;

    size?: string;
    lang?: string;
    dnt?: boolean;
}

@Component({
    selector: "twitter-share-button",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwitterShareButtonComponent implements OnChanges {

    @Input() location: string;
    @Input() text: string;
    @Input() hashtags: string;
    @Input() via: string;
    @Input() related: string;
    @Input() size: string;
    @Input() lang: string;
    @Input() dnt: boolean;
    
    @Output() load: EventEmitter<any> = new EventEmitter<any>();

    constructor(private element: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges() {
        this.loadWidget();
    }

    loadWidget(): Promise<any> {
        if (this.element.nativeElement.children.length > 0) {
            return this.renderShareButton();
        }
        let script = this.renderer.createElement(this.element.nativeElement, "script");
        script.src = "//platform.twitter.com/widgets.js";
        return new Promise(resolve => {
            this.renderer.listen(script, "load", () => {
                this.renderShareButton()
                    .then(() => {
                        resolve();
                    });
            });
        });
    }

    private renderShareButton(): Promise<any> {
        return (window as any).twttr.widgets.createShareButton(
            this.location || location.href,
            this.element.nativeElement,
            <ShareButtonOptions>{
                text: this.text || document.title,
                hashtags: this.hashtags || null,
                via: this.via || null,
                related: this.related || null,
                size: this.size || null,
                lang: this.lang || null,
                dnt: this.dnt || null
            }
        ).then((el: HTMLIFrameElement) => {
            el.style.visibility = null;
            el.style.height = null;
            el.style.width = null;
            this.load.emit(el);
        });
    }
}
