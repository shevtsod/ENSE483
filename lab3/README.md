# ENSE 483 - Lab 3 - Android Activities

![Demo](./assets/demo.gif)

## Problem Statement

- Watch tutorials 14 to 21 at:

  https://youtu.be/4NDwINudmDk?list=PLgCYzUzKIBE8TUoCyjomGFqzTFcJ05OaC

- Modify [`lab2`](../lab2) source code.
  - Implement passing information between activities.
    - In one activity, when a button is clicked, a YouTube URL is sent to
      another activity that plays the video at the URL.
    - In one activity, when a button is clicked, pass the GPS coordinates of the
      current location to another activity. On the second activity, take a photo
      and use the coordinates from the first activity to geo-tag that photo.

## Developing

Forked from https://github.com/mitchtabian/Buttons.

Developed and built using
[Android Studio](https://developer.android.com/studio).

UI design diagram created using [Krita](https://krita.org/) and available under
[`./doc`](./doc).

> **NOTE**
>
> In order to build and run this project, you must create an `apikey.properties`
> file in the root directory of the project and follow the
> [official documentation](https://developers.google.com/youtube/android/player/register)
> to generate an API key to use for playing YouTube videos.
>
> Enter your API key as follows in `apikey.properties`:
>
> ```shell
> YOUTUBE_API_KEY="[YOUR API KEY HERE]"
> ```
