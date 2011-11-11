JS Test Driver Sample Project
=============================

This set up should work both from the maven command line and using the eclipse
JS Test Driver plug-in.

Maven
-----

I've hard-coded the paths to firefox and internet explorer. I had problems getting Chrome to work
so it's commented out. I think you can just keep the name of the executable files if the browsers are
in your path.

mvn clean install

Eclipse
-------

Install the [eclipse plug-in](http://code.google.com/p/js-test-driver/wiki/UsingTheEclipsePlugin).
This set up works with version 1.1.1e of the plug-in.

You'll need to create a new JS Test Driver Test run configuration. Pick the jstestdriver-sample-project
project and pick jsTestDriver.conf as the config file.
