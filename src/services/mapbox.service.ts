import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { NgxXmlToJsonService } from 'ngx-xml-to-json';

export interface MapboxOutput {
    attribution: string;
    features: Feature[];
    query: [];
}

export interface Feature {
    place_name: string;
}

@Injectable({
    providedIn: 'root',
})
export class MapboxService {
    constructor(private http: HttpClient,
        // private ngxXmlToJsonService: NgxXmlToJsonService
    ) { }
    // RssData: NewsRss;
    // public searchWord(query: string) {
    //     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    //     return this.http
    //         .get(
    //             url +
    //             query +
    //             '.json?types=address&access_token=' +
    //             environment.mapbox.accessToken
    //         )
    //         .pipe(
    //             map((res: MapboxOutput) => {
    //                 return res.features;
    //             })
    //         );
    // }

    // public getAddress(long, lat) {
    //     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    //     return this.http
    //         .get(
    //             url +
    //             long +
    //             ',' +
    //             lat +
    //             '.json?access_token=' +
    //             environment.mapbox.accessToken
    //         )
    //         .pipe(
    //             map((res: MapboxOutput) => {
    //                 return res.features;
    //             })
    //         );
    // }

    public getNewsFeed() {
        return this.http.get('https://timesofindia.indiatimes.com/rssfeedstopstories.cms?feedtype=sjson', { responseType: 'text' });
        //   .pipe(
        //     map((res: any) => {
        //       return res;
        //     })
        //   );
    }

    GetRssFeedData() {
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ftimesofindia.indiatimes.com%2Frssfeeds%2F-2128838597.cms';
        this.http
            .get<any>(url)
            .subscribe(data => {
                // const parseString = this.xmlToJson(data);
                const options = { // set up the default options
                    textKey: 'text', // tag name for text nodes
                    attrKey: 'attr', // tag for attr groups
                    cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
                };
                // const obj = this.ngxXmlToJsonService.xmlToJson(data, options);
                console.log(data);
                // parseString(data, (err, result: NewsRss) => {
                //     this.RssData = result;
                // });
            });
    }
}
