# Documentation

The Pixelfed documentation can be found at [docs.pixelfed.org].
The source code repository for the documentation is hosted on [GitHub][repository].
If you find any mistakes in the documentation, please have a look at the [open issues][repository] and open a new one if yours does not exist.

## Contributing to Documentation

The following sections should get you started on contributing to the documentation of Pixelfed.
Before getting started, please read the [Code of Conduct].

## Writing Documentation Online

To get started writing the documentation, you only need a GitHub account.
You can find the documentation in its [GitHub repository][repository].
Find the right page and after log-in, you can see an edit button above the document.
Please create a Pull Request with your changes.
We are using [Markdown] as the format for the documentation files (`.md`).

[Markdown]: https://www.markdownguide.org/cheat-sheet/

## Building the Documentation Locally

For most additions and changes to the documentation, you do not need to build the documentation locally.

If you choose to build the documentation website on your own computer, follow these steps:

1. Install the required software:

    * [Git](https://git-scm.com/) or [Github Desktop](https://desktop.github.com/)
    * [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Clone the [repository].

    ```sh
    git clone https://github.com/pixelfed/docs.git pixelfed-docs
    cd pixelfed-docs
    ```

3. Install [VitePress] and the other dependencies.

    ```sh
    # in the pixelfed-docs directory
    npm install
    ```

4. Build and serve the documentation:

    ```sh
    # in the pixelfed-docs directory
    npm run docs:dev
    ```

    Then, visit [localhost:5173](http://localhost:5173/) in your browser.
    It should look like [docs.pixelfed.org].
    Now, whenever you change a file, it should automatically reload with the changes.

You are set up! Happy documenting!

## Related Links

* [Markdown]
* [VitePress]
* [Code of Conduct]
* [The official Pixelfed documentation][docs.pixelfed.org]
* [The Pixelfed documenation repository][repository]

[VitePress]: https://vitepress.dev/
[docs.pixelfed.org]: https://docs.pixelfed.org
[Code of Conduct]: /CODE_OF_CONDUCT
[repository]: https://github.com/pixelfed/docs
