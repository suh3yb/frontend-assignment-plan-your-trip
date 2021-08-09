# Plan your trip: Tiqets Frontend Assignment

Thanks for applying! This assignment allows us to assess your Frontend skills, specifically the technical expertise and knowledge we look for in a fellow Frontend Developer.

## The app to be built

You will build a product searcher, where users will select a Country, City and Date, and then a list of products will be shown based on those search options.

The app is responsive to the screen width. For simplicity's sake, we'll focus on 2 sizes and refer to them as *mobile* and *desktop*.

### Design specification

[Figma Design Link](https://www.figma.com/file/6qsa896sJurITBaw6sw1ml/Front-end-assignment?node-id=0%3A1). With this document, you should be able to understand the user flow and all UI states, as well as the CSS styles that should be applied overall.

### How it should work

There are essentially 3 main sections in the app:

### 1) Country and City filters.

* On mobile, the filters should be on top of each other. On desktop, they should be next to each other.
* Initially, neither filter will have a selected value. The City filter should be disabled, and only become enabled after a Country is selected.
* The Country filter will list all possible Countries, after selecting a Country, the City filter will list only the Cities corresponding to the selected Country.
* The data for the Countries and Cities is provided by a JSON API. [See details](#apis) below.

### 2) Date Picker

* On mobile, the first 5 Dates should be shown. On desktop, the first 8 Dates should be shown.
* Initially, all Dates will be disabled. Only after selecting a City the Dates will become enabled.
* The data for the avaiable Dates is provided by a JSON API. [See API details](#apis) below.

### 3) Search Results / List of Products / Product Card

* After selecting a Date, the app should make a request to the product search API (provided, [see API details](#apis) below). The response will be a list of products, which data will be used to render the list of results.
* Each product is visually represented by a Product Card. The card has a different layout between mobile and desktop.
* Each card shows: title, short description (desktop-only), image, and price.
* Some products include a *discount percentage*. In this case, a *pre-discount price* should be shown in the card. This *pre-discount* is **calculated** based on the *price* and the *discount percentage*.
* The product image on the card has a different aspect ratio between mobile and desktop. The images should be lazy-loaded.
* Clicking the card should navigate users to the Tiqets.com page for that product.
* On mobile, the cards should be shown in a single column - in other words, on top of each other. On desktop, they should be shown in 2 columns, as shown in the [Design specification](#design-specification).
* For the layout of this list of products, **CSS Grid** should be used.

## APIs

We provide all the JSON API endpoints.

### City and Country

```
endpoint-url.here
```

This endpoint returns the fixed list of countries as well as the list of cities and the cities' IDs, all in a single response.

```
{
  "The Netherlands": [
    [111, "Amsterdam"],
    [222, "Rotterdam"],
    [333, "Utrecht"],
    [444, "Delft"],
    ...
  ],
  "United States": [
    [111, "New York City"],
    [222, "Seattle"],
    ...
  ],
  ...
}
```

### Dates

```
endpoint-url.here
```

This endpoint returns the fixed list of Dates that should be shown, all in a single response.

```
{
  "dates": ["2021-12-31", "2022-01-01", ..., "2022-01-05"]
}
```

### Product Search

```
endpoint-url.here
```

This endpoint returns a dynamic list of products, based on the URL parameters passed.

* `city_id` - the ID of a city. Number. Required. Example: `city_id=321`.
* `date` - date, formatted in ISO. String. Required. Example: `date="2021-12-25"`.

```
{
	"products": [
		{
			
		},
		...
	]
}
```

## General guidelines

Here's a few things that we generally expect in the delivery:

* A full implementation of the visual design and the functionality presented above.
* As few external or 3rd-party libraries as possible.
* Use of semantic, accessible markup.
* All scripting must be written in TypeScript.