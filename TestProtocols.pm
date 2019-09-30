use Selenium::Remote::Driver;
use Selenium::Chrome;
use Selenium::Remote::WDKeys;
use File::Slurp;
use strict;
use 5.010;
use Path::Tiny qw(path);
use File::Copy "cp";
use Test::Assert ':all';
use Exporter;
use TestASL;
use TestBits;

our @ISA    = qw(Exporter);
our @EXPORT = qw(addProtocol);

sub addProtocol
{
	my $driver = shift;
        my $textfile = shift;
        my $objective = shift;
	my $number = shift // 1;
	if ($number >1 )
	{
		clickOnThing($driver, 'button', 'tag_name', 'Add another protocol');
	}
        clickOnThing($driver, 
		'(//input[contains(@id,"protocols") and contains(@id, "title")])[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'button', 'tag_name', 'Continue');
        clickOnThing($driver,
        '//label[contains(.,\'Briefly describe the purposes of this protocol\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
	if ($number > 1) { $driver->pause(100000000); }
        selectThing($driver, '(//input[@type=\'radio\'])', 'protocol.*severity-severe');
        clickOnThing($driver,
        '//label[contains(.,\'Why are you proposing this severity category\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        ## click on the objective
        selectThing($driver,"//label[contains(.,\'$objective\')]");
        clickOnThing($driver,
        '//label[contains(.,\'What outputs are expected to arise from this protocol\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'h3', 'tag_name', 'Animals used in this protocol');
        
        ### Animals used in this protocol
        selectThing($driver,'//label[contains(.,\'Mice\')]');
        selectThing($driver,'//label[contains(.,\'Embryo\')]');
        selectThing($driver,'//label[contains(.,\'Neonate\')]');
        selectThing($driver,'//label[contains(.,\'Adult\')]');
        selectThing($driver,'//label[contains(.,\'Pregnant\')]');
        selectThing($driver,'//label[contains(.,\'Aged\')]');
        selectThing($driver,'//label[contains(.,\'Juvenile\')]');
        selectThing($driver, '//input[@value=\'true\']', 'protocol.*continued-use-true');
        clickOnThing($driver,
        '//label[contains(.,\'How did these animals start their use\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        selectThing($driver, '//input[@value=\'true\']','protocol.*reuse-true');
        clickOnThing($driver,
        '//label[contains(.,\'Describe any procedure that may have been applied to these animals\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver,
        '//label[contains(.,\'What is the maximum number of animals that will be used on this protocol\')]'
        ,'xpath');
        replaceTextInThing($driver, int(rand(500))+200);
        
        ## Genetically Altered Animals
        clickOnThing($driver, 'h3', 'tag_name', 'GAA');
        
        selectThing($driver, '(//input[@type=\'radio\'])', 'protocol.*gaas-true');
	clickOnThing($driver,
        '//label[contains(.,\'Which general types or strains will you be using and why\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        selectThing($driver, '//input[@value=\'true\']', 'protocol.*gaas.*harmful.*true');
        clickOnThing($driver,
        '//label[contains(.,\'Why are each of these harmful phenotypes necessary\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver,
        '//label[contains(.,\'How will you minimise the harms associated with these phenotypes\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'h3', 'tag_name', 'Steps');
        
        clickOnThing($driver,
        '//label[contains(.,\'Describe the procedures that will be carried out during this step\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        
        selectThing($driver, '//input[@value=\'false\']', 'protocol.*optional.*false');
        
        selectThing($driver, '//input[@value=\'true\']', 'protocol.*adverse.*true');
        clickOnThing($driver,
        '//label[contains(.,\'What are the likely adverse effects of this step\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        clickOnThing($driver,
        '//label[contains(.,\'How will you monitor for, control, and limit any of these adverse effects\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        clickOnThing($driver,
        '//label[contains(.,\'What are the humane endpoints for this step\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'button', 'tag_name', 'Save step');
        
        clickOnThing($driver, 'h3', 'tag_name', 'Animal experience');
        
        clickOnThing($driver,
        '//label[contains(.,\'Summarise the typical experience or end\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
clickOnThing($driver, 
        '//label[contains(.,\'Describe the general humane endpoints that you will apply during the protocol\')]/following::div[1]'
        ,'xpath');
        
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'h3', 'tag_name', 'Experimental design');
	selectThing($driver, '(//input[@type=\'radio\'])', 'protocol.*quantitative-data-true');
        selectThing($driver, '(//input[@type=\'radio\'])', 'protocol.*quantitative-data-guideline-true');
        clickOnThing($driver,
        '//label[contains(.,\'How will you ensure that you are using the most refined methodology\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver, 'h3', 'tag_name', 'Protocol justification');
       
	clickOnThing($driver,
        '//label[contains(.,\'the most appropriate scientific approach\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
 
        clickOnThing($driver,
        '//label[contains(.,\'the most refined for the purpose\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));

        clickOnThing($driver,
        '//label[contains(.,\'For each model and\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));

        clickOnThing($driver,
        '//label[contains(.,\'Why scientifically do the animals need to suffer to this degree\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver,
        '//label[contains(.,\'achieve your scientific outputs with an earlier humane endpoint\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
       	selectThing($driver, '(//input[@type=\'radio\'])', 'protocol.*justification-substances-true');
        clickOnThing($driver,
        '//label[contains(.,\'How will you assess the suitability of these substances\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        clickOnThing($driver,
        '//label[contains(.,\'How will you determine an appropriate dosing regimen\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        clickOnThing($driver, 'h3', 'tag_name', 'Fate of animals');
        
        selectThing($driver, '(//input[@type=\'checkbox\'])', 'protocol.*fate-killed');
        
        selectThing($driver, '(//input[@type=\'checkbox\'])', 'protocol.*killing-method-schedule-1');

        selectThing($driver, '(//input[@type=\'checkbox\'])', 'protocol.*killing-method-other');



        clickOnThing($driver,
        '//label[contains(.,\'For each non-schedule 1 method, explain why this is necessary\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        selectThing($driver, '(//input[@type=\'checkbox\'])', 'protocol.*fate-kept-alive');
        
        selectThing($driver, '(//input[@type=\'checkbox\'])', 'protocol.*fate-continued-use');
        
        clickOnThing($driver,
        '//label[contains(.,\'Please state the relevant protocol\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        selectThing($driver, '//*[@id="complete-true"]');
        
        clickOnThing($driver, 'button', 'tag_name', 'Continue');
	yesYesYes($driver, 1);        
	return 1;        	
}
return 1;

