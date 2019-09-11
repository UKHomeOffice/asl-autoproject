#! /usr/bin/perl
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

sub test_li
{
my ($package, $filename, $line) = caller;
say STDERR "Package: $package Filename: $filename Line: $line";
my $username = shift || die "No username";
my $password = $ENV{'TPW'} || die "No password";
my $dev_or_pre = shift || die "No environment";
my $url = figureURL('pub', $dev_or_pre);

my $textfile = shift || die "No text file";
my $nonce = int(rand(100000));
$ENV{'NONCE'} = $nonce;
say STDERR "Nonce is $nonce";
say STDERR "URL is $url";
my $establishment = shift // 'University of Croydon';

my $driver = Selenium::Remote::Driver->new(
            browser_name       => 'chrome',
            extra_capabilities => {
                chromeOptions =>
                  { args => ['headless', 'disable-gpu'] }
            },    
        );

# when you're done
$driver->get($url);
my $element;
$FAIL_WAIT = 'die';

login($driver, $username, $password);
clickOnThing($driver, 'h3', 'tag_name', $establishment);
clickOnThing($driver, 'a', 'tag_name', 'View establishment information');

clickOnThing($driver, 'a', 'tag_name', 'Projects');
clickOnThing($driver, 'a', 'tag_name', 'Drafts');
	clickOnThing($driver, 'button', 'tag_name','Apply for project licence');
        clickOnThing($driver, 'a', 'tag_name', 'Introductory details');
        clickOnThing($driver, 'button', 'tag_name', 'Continue');
fillInPPL($driver, $textfile, $nonce);
return 0;
}

1;
