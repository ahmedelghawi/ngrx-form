# AngularTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Package installation

Run `npm install` to download all necessary packages. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Trade-offs of using NgRx and RxJS in form handling:

NgRx
Pros:
    - With NgRx in relation to form handling, being able to store the form values gives the ability to share those values across the application.
    - Able to trace data flow through use of Redux tools allowing for easier debugging being able to see the state of values at each step.
    - Effects allow further clean functionality when actions are called, so when updating a form or performing any form actions, using effects to add extra functionality is helpful.

Cons:
    - Just using NgRx for form handling would cause a lot of code to be split up and as a result mean a lot of files for simple functionality being split with reducers, effects, and actions, which can be mentally exhausting.
    - Simple form handling can be implemented incorrectly if NgRx is not written well as the learning curve is steep.


RxJS
Pros:
    - Able to work with asynchronous data, allowing for easier manipulation of forms, from value changes to validator checks.
    - Not having to use a state management library for a simple form means that the application would be lightweight in comparison, which is better for an application which is small such as an application which only has a form.

Cons: 
    - Not able to trace data easily which makes debugging more difficult
    - Having to manage data without state which can lose structure and as a result cause inconsistences in form data.

## Potential performance pitfalls or over-engineering issues that can arise when using RxJS for simple form interactions:

    - Using RxJS for basic form interactions would cause complex code to be written to do meanial tasks, and this could potentially lead to bugs. Another big issue for RxJS is performance as the use of complex operators can cause performance issues when there is no need for something as small as form handling. There are also other ways that performance can be affected through subscriptions if they are kept running for too long or not properly dealt with at the ngDestroy stage of a component. Keeping subscriptions running too long can cause performance issues and not unsubscribing from methods can cause memory leaks.

    It may be less complex than NgRx but it still has a learning curve which new developers may find difficult to adjust to, and as a result if trying to teach a new developer it could take a bit more time and as a result hinder development. The use of RxJS for simple form interactions would encounter even more issues through complicated code logic when not needed, using a lot of Angular's built-in functionality could reduce the complexity of the project through simple features such as reactive forms. 

    So in summary, RxJS usage for simple form interactions could cause performance issues, memory leaks, over complications of codebase, amongst over things.

## When and why you would choose not to use NgRx/RxJS for form state management:

    Reasons when not to use NgRx/RxJs:
        - Simple Forms: Angular has many built in features which allows for simple interactions through the use of reactive forms or template driven forms and this would be used for forms which are very basic, such as a contact us form, or user form.
        - Experience amongst team members: You do not use this when your team are inexperienced with these technologies. Teach them first and then begin to implement it but this will take time. So you would avoid NgRx/RxJS for form state management in this case because the team would be inexperienced and could potentially lead to bugs through badly written or mis-managed code causing longer development times.
        - As mentioned before performance issues is a key factor when deciding not to choose NgRx/RxJS for form state management as when you have a small application you do not want to over complicate and slow down the application through the use of these technologies, NgRx can increase the bundle size and RxJS can bring on performance issues caused by mis-managed code.
