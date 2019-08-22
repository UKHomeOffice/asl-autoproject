#! /usr/bin/perl
###! /usr/local/bin/perl
use strict;
use warnings;
use Cwd;
use lib cwd;
use Selenium::Remote::Driver;
use Selenium::Chrome;
use Selenium::Remote::WDKeys;
use File::Slurp;

use 5.010;
use Path::Tiny qw(path);
use File::Copy "cp";
use TestASL;
use TestBits;

my $username = shift || die "No username";
my $password = shift || die "No password";
my $url = shift || die "No URL";
my $textfile = shift || die "No text file";
my $nonce = shift;

my $driver = Selenium::Remote::Driver->new(
            browser_name       => 'chrome',
            extra_capabilities => {
                chromeOptions =>
                  { 
			  args => ['headless', 'disable-gpu'] 
		  }
            },    
        );

# when you're done
$driver->get($url);
my $element;
$FAIL_WAIT = "die";

login($driver, $username, $password);
clickOnThing($driver, 'a', 'tag_name', 'In progress');
clickOnThing($driver, 'a', 'tag_name', 'Outstanding');
$driver->pause(1000);
clickOnThing($driver, 'a', 'tag_name', 'Received');
$driver->pause(1000);
clickOnThing($driver, 'a', 'tag_name', 'Received');

clickOnThing($driver, 'a', 'tag_name', 'PPL application');
clickOnThing($driver, "//h3[contains(text(),\'$nonce\')]");
selectThing($driver, '//*[@id="status-resolved"]');
clickOnThing($driver, 'button', 'tag_name', 'Continue');
clickOnThing($driver, '//*[@id="comment"]', 'xpath');
replaceTextInThing($driver, someText(10, $textfile));
clickOnThing($driver, 'button', 'tag_name', 'Grant licence');
success($driver, 'Amendment approved');
