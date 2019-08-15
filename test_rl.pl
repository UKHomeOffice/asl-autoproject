#! /usr/local/bin/perl
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
$FAIL_WAIT = "die";
##my $driver = Selenium::Chrome->new;
my $driver = Selenium::Chrome->new(
            browser_name       => 'chrome',
            extra_capabilities => {
                chromeOptions =>
                  { args => ['headless', ] }
            },    
        );

$driver->get($url);
my $element;

login($driver, $username, $password);
clickOnThing($driver, 'a', 'tag_name', 'In progress');
clickOnThing($driver, 'a', 'tag_name', 'Outstanding');
clickOnThing($driver, 'a', 'tag_name', 'Received');
$driver->pause(1000);
clickOnThing($driver, 'a', 'tag_name', 'Received');
$driver->pause(1000);
clickOnThing($driver, 'a', 'tag_name', 'PPL application');
clickOnThing($driver, "//h3[contains(text(),\'$nonce\')]");
selectThing($driver, '//*[@id="status-inspector-recommended"]');
clickOnThing($driver, 'button', 'tag_name', 'Continue');
clickOnThing($driver, '//*[@id="comment"]', 'xpath');
replaceTextInThing($driver, someText(10, $textfile));
clickOnThing($driver, 'button', 'tag_name', 'Recommend');
success($driver, 'Recommendation sent');

