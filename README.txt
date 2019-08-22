The environment variable TPW needs to be set to the password for development and preprod environments

I created an image using:

	docker build -t mydocker .

Example run: this fills in a PPL application completely.
* Logs in as holc and creates an application starting TESTNNNNN where NNNNN is a random number
* Then logs in as inspector and recommends that the licence be granted.

Currently this is *ONLY* in the dev environment.

	docker run --net=host -e TPW="$TPW" mydocker

whilst at the same time running 

	docker run --net=host -it -p 4444:4444 selenium/standalone-chrome-debug:3.141.59-oxygen

To Do:
	* Turn the scripts into proper tests with a test runner
	* add specific versions of perl modules for all the perl modules
	* handle a parameter for the environment which is tested
