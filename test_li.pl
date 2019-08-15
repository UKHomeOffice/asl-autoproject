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
my $establishment = shift // 'University of Croydon';

my $driver = Selenium::Chrome->new;
# when you're done
$driver->get($url);
my $element;
$FAIL_WAIT = 'wait';

login($driver, $username, $password);
clickOnThing($driver, 'h3', 'tag_name', $establishment);
clickOnThing($driver, 'a', 'tag_name', 'View establishment information');

clickOnThing($driver, 'a', 'tag_name', 'Projects');
clickOnThing($driver, 'a', 'tag_name', 'Drafts');
	clickOnThing($driver, 'button', 'tag_name','Apply for project licence');
        clickOnThing($driver, 'a', 'tag_name', 'Introductory details');
        clickOnThing($driver, 'button', 'tag_name', 'Continue');
fillInPPL($driver, $textfile, $nonce);
success($driver, 'Application submitted to inspector');$driver->pause(10000);
