# ENSE 483 - Lab 5 - Bluetooth Programming

## Problem Statement

1. Watch first 4 tutorials at:

   https://www.youtube.com/watch?v=y8R2C86BIUc&list=PLgCYzUzKIBE8KHMzpp6JITZ2JxTgWqDH2

2. Draw UML class and sequence diagrams of the code that was implemented.
3. Create three different versions of the code:
   1. ([v1](./v1)) Have the main activity start other activities and use only
      one `onActivityResult()` method to handle their results.
   2. ([v2](./v2)) Have the main activity contain many `BroadcastReceiver`s,
      each listening to one Android system event.
   3. ([v3](./v3)) Have the main activity contain one `BroadcastReceiver` that
      listens to many Android system events.

## Developing

Forked from https://github.com/mitchtabian/Bluetooth---How-to-Pair.

Developed and built using
[Android Studio](https://developer.android.com/studio).

UML diagrams created using [UMLet](https://www.umlet.com/) and available under
[`./doc`](./doc).
