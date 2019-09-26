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
use TestProtocols;


our @ISA    = qw(Exporter);
our @EXPORT = qw(dealWithExemptions fillInPPL login getToProjects createIfNotThere);
our $FAIL_WAIT;

my $file_content;
my $word_count;
my $objective1;
my $objective2;

sub dealWithExemptions
{
	my $driver = shift;
	my $textfile= shift;
	my $counter = 1;
	my $option;
        while( eval{$option = $driver->find_element('(//input[@type=\'checkbox\'])['.$counter.']')} || 0)
	{
		if(yesOrNo())
		{
			selectThing($driver, '(//input[@type=\'checkbox\'])['.$counter.']');
		}
		$counter++;
	}
        $counter = 1;
	while( eval{$option = $driver->find_element('(//textarea)['.$counter.']')} || 0)
        {
                if($option->is_displayed())
		{
			$option->click();
			replaceTextInThing($driver, someText(10, $textfile));
		}
		$counter++;
        }
	clickOnThing($driver, 'button', 'tag_name', 'Continue');
}


sub login
{
        my $driver = shift;
        my $username = shift;
        my $password = shift;
        clickOnThing($driver, '//*[@id="username"]', 'xpath');
        $driver->send_keys_to_active_element($username);
        clickOnThing($driver, '//*[@id="password"]', 'xpath');
        $driver->send_keys_to_active_element($password);
        clickOnThing($driver, '//input[@value=\'Log In\']', 'xpath');
        $driver->pause(1000);
}

sub yesYesYes
{
	my $driver = shift;
        my $nth = shift // 0;
	clickOnThing($driver, '//button[text()=\'Continue\']','xpath','', $nth);
        selectThing($driver, '//*[@id="complete-true"]');
        clickOnThing($driver, 'button', 'tag_name', 'Continue');
}

sub projectName
{
	my @months = qw( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec );
	my @days = qw(Sun Mon Tue Wed Thu Fri Sat Sun);
	(my $sec,my $min, my $hour,my $mday,my $mon,my $year,my $wday,my $yday,my $isdst) = localtime();
	my $returnString =  "TEST$days[$wday]$mday$months[$mon]";   
	say $returnString;
	return $returnString;
}


sub introductoryDetails
{
        my $driver = shift;
        my $textfile = shift;
        my $nonce = shift // "";
        
	clickOnThing($driver,  '//*[@id="title"]', 'xpath');
        my $title= $nonce.someText(10, $textfile);
        replaceTextInThing($driver, $title);
	say STDERR "TITLE: ".$title;
        clickOnThing($driver, '//label[contains(.,\'aim of this project\')]/following::div[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        
        ##Why is it important to undertake this work
        clickOnThing($driver,'//label[contains(.,\'Why is it important to undertake this work\')]/following::div[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        selectThing($driver,'//*[@id="permissible-purpose-basic-research"]');
        clickOnThing($driver,'//label[contains(.,\'Years\')]/following::option[5]', 'xpath');
        clickOnThing($driver,'//label[contains(.,\'Months\')]/following::option[7]', 'xpath');
        
        clickOnThing($driver,'summary', 'tag_name', 'Small');
        selectThing($driver,'//*[@id="species-mice"]');
        yesYesYes($driver, 1); 
	return 1;
}


sub experience
{
        my $driver = shift;
        my $textfile = shift;

        clickOnThing($driver, 'a', 'tag_name', 'Experience');
        clickOnThing($driver,'label', 'tag_name', 'Yes');
        clickOnThing($driver,
        '//label[contains(.,\'main achievements\')]/following::div[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        clickOnThing($driver,
        '//label[contains(.,\'relevant expertise\')]/following::div[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        clickOnThing($driver,
        '//label[contains(.,\'other people\')]/following::div[1]', 'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
	yesYesYes($driver);        
	return 1;
}

sub funding
{
        my $driver = shift;
        my $textfile = shift;
        
        ##### Funding
        clickOnThing($driver, 'a', 'tag_name', 'Funding');
clickOnThing($driver,
        '//label[contains(.,\'How do you plan to fund your work\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
	selectThing($driver, '//input[@type=\'radio\']', 'funding-basic-translational-true');
clickOnThing($driver,
        '//label[contains(.,\'peer\')]/following::div[1]'
        ,'xpath');
        replaceTextInThing($driver, someText(10, $textfile));
        yesYesYes($driver); 
        return 1;
} 


sub submitApplication
{
     my $driver = shift;
     my $textfile = shift;
     ## Avoid a pop up dialog by waiting a bit
     $driver->pause(5000);
     clickOnThing($driver, 'button', 'tag_name', 'Continue');
     selectThing($driver, '//*[@id="authority-yes"]');
     clickOnThing($driver, '//*[@id="authority-pelholder-name"]');
     replaceTextInThing($driver, someText(10, $textfile));
     clickOnThing($driver, '//*[@id="authority-endorsement-date"]');
     replaceTextInThing($driver, someText(10, $textfile));
     selectThing($driver, '//*[@id="awerb-yes"]');
     clickOnThing($driver, '//*[@id="awerb-review-date"]');
     replaceTextInThing($driver, someText(10, $textfile));
     selectThing($driver, '//*[@id="ready-yes"]');
     $driver->pause(5000);
     clickOnThing($driver, 'button', 'tag_name', 'Submit PPL application');
     $driver->pause(5000);
}

sub fillInPPL
{
	my $driver = shift;
        my $textfile = shift;
        my $nonce = shift;
	my $filename = "tmp.png";
        assert_true(introductoryDetails($driver, $textfile, $nonce), "Introductory Details");
        assert_true(experience($driver, $textfile), "Experience");
        assert_true(funding ($driver, $textfile), "Funding");

##### Establishment
clickOnThing($driver, 'a', 'tag_name', 'Establishment');
selectThing($driver, '//*[@id="other-establishments-false"]');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

selectThing($driver,'//*[@id="establishments-care-conditions-false"]');
clickOnThing($driver,
'//label[contains(.,\'If any establishment does not meet these requirements\')]/following::div[1]', 'xpath');
replaceTextInThing($driver, someText(10, $textfile));

yesYesYes($driver);
#####goto FATE_OF_ANIMALS;
##### POLEs
clickOnThing($driver, 'a', 'tag_name', 'POLE');
selectThing($driver,'//*[@id="poles-true"]');
my @questions=("this part of your project take place at a licensed establishment?");
my @answers = ("Because I need feral ferrets.");
replaceTextInMultiple($driver, \@questions, '', \@answers);
clickOnThing($driver, 'button', 'tag_name', 'Continue');
selectThing($driver, '(//input[@type=\'text\'])', 'POLE.*title');

replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'Details\')]/following::div[1]',
'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver, 'button', 'tag_name', 'Continue');
clickOnThing($driver,
'//label[contains(.,\'How will you ensure that procedures taking place at these POLEs can be inspected\')]/following::div[1]',
'xpath');
replaceTextInThing($driver, someText(10, $textfile));
selectThing($driver,'//*[@id="poles-transfer-true"]');

clickOnThing($driver,
'//label[contains(.,\'Why do you need to move animals between a POLE and a licensed establishment\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'How will you ensure that animals are in a suitable condition to be transported\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'Who will be responsible for checking the animals before they are transported\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'How will you ensure that this person is competent to make the appropriate checks\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'How might the movement of animals between a POLE and a licensed establishment affect the scientific delivery of this project\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver,
'//label[contains(.,\'What arrangements will be made to assure an animal\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));
clickOnThing($driver, 'button', 'tag_name', 'Continue');
selectThing($driver,'//*[@id="complete-true"]');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

SCIENTIFIC_BACKGROUND:
#### Scientific Background
say "SCIENTIFIC_BACKGROUND";
clickOnThing($driver, 'a', 'tag_name', 'Scientific Background');
selectThing($driver,'//*[@id=\'scientific-background-basic-translational-true\']');
selectThing($driver,'//*[@id=\'clinical-condition-true\']');
selectThing($driver,'//*[@id=\'scientific-background-producing-data-true\']');
selectThing($driver,'//*[@id=\'scientific-background-producing-data-service-true\']');
selectThing($driver,'//*[@id=\'scientific-background-non-regulatory-true\']');
selectThing($driver,'//*[@id=\'scientific-background-non-regulatory-condition-true\']');
selectThing($driver,'//*[@id=\'scientific-background-genetically-altered-true\']');
selectThing($driver,'//*[@id=\'scientific-background-vaccines-true\']');
selectThing($driver,'//*[@id=\'transfer-expiring-true\']');

my @questions = (
'Briefly summarise the current state of scientific knowledge in this area of work to show how you arrived at the starting point of this project',
'How prevalent and severe are the relevant clinical conditions?',
'How will these products benefit human health, animal health, or the environment?',
'How will you select the most appropriate scientific model or method?',
'In general terms, how will those using your service use the data that your produce?',
'In general terms, how will those using your service use the product?',
'In general terms, how will your clients use the data or other outputs that you produce?',
'Please state the licence number and expiry date of all these licences',
'What are the likely demands for the products over the lifetime of the project?',
'What are the likely demands for the service over the lifetime of the project?',
'What are the problems with current treatments which mean that further work is necessary?',
'What is the nature of the service you wish to provide?',
'What is the scientific basis for your proposed approach?',
'What new knowledge do you hope to discover that will address a gap in fundamental scientific knowledge or meet a clinical need?',
'What products do you wish to provide?',
'What service do you wish to provide?',
'What substances or devices will undergo regulatory testing?',
'Who will you provide a service to?',
'Who will you provide the service to?',);

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);

ACTION:
#### Action 
say "ACTION";
clickOnThing($driver, 'a', 'tag_name', 'Action');
selectThing($driver, '(//input[@type=\'text\'])', 'objective.*title');
## hold on to the objective so we can click on it later
$objective1 = someText(10, $textfile);
replaceTextInThing($driver, $objective1);

clickOnThing($driver,
'//label[contains(.,\'How do each of these objectives relate to each other and help you to achieve your aim\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

clickOnThing($driver, 'button', 'tag_name', 'Add another objective');
selectThing($driver, '(//input[@type=\'text\'])', 'objective.*title', 1);
$objective2 = someText(10, $textfile);
replaceTextInThing($driver, $objective2);

clickOnThing($driver, 'button', 'tag_name', 'Continue');

clickOnThing($driver,
'//label[contains(.,\'animal alternatives for all or part of your work\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

yesYesYes($driver);

GENERAL:
### General
say "GENERAL";

clickOnThing($driver, 'a', 'tag_name', 'General');
clickOnThing($driver,
'//label[contains(.,\'Unnecessary duplication of work must be avoided\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

selectThing($driver,'//*[@id="experimental-design-sexes-false"]');

clickOnThing($driver,
'//label[contains(.,\'Why will you use animals of a single sex in some protocols or experiments\')]/following::div[1]',
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

yesYesYes($driver);


##### Benefits
clickOnThing($driver, 'a', 'tag_name', 'Benefits');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

clickOnThing($driver,
'//label[contains(.,\'What outputs do you think you will see at the end of this project\')]/following::div[1]'
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));
clickOnThing($driver,
'//label[contains(.,\'Who or what will benefit from these outputs\')]/following::div[1]'
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));
clickOnThing($driver,
'//label[contains(.,\'How will you look to maximise the outputs of this work\')]/following::div[1]'
,'xpath');
replaceTextInThing($driver, someText(10, $textfile));

## click on the second "continue button on the page";
yesYesYes($driver, 1);

##### Protocols
clickOnThing($driver, 'a', 'tag_name', 'Protocols');

## is there a protocol already?
if (!isOnPage($driver,'Completed'))
{
   #### add a protocol
   addProtocol($driver, $textfile, $objective1, 1);
   #### clickOnThing($driver, 'a', 'tag_name', 'Protocols');
   #### addProtocol($driver, $textfile, $objective2, 2);
}
else
{
   yesYesYes($driver,1);
}

PROJECT_HARMS:
clickOnThing($driver, 'a', 'tag_name', 'Project harms');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

my @questions = (
"Explain why you are using these types of animals and your choice of life stages", 
"what will be done to an animal used in your project", 
"What are the expected impacts and",
"What are the expected severities and the proportion of animals in each category" );

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver, 1);
FATE_OF_ANIMALS:
##### Fate of Animals
clickOnThing($driver, 'a', 'tag_name', 'Fate of animals');

clickOnThing($driver, 'button', 'tag_name', 'Continue');

selectThing($driver, '//*[@id="fate-of-animals-nts-true"]');

@questions =
("What types of animals will you keep alive",
"What criteria will the veterinary surgeon, or competent person trained by a veterinary surgeon, use to determine whether animals can be kept alive",
"under the supervision of the veterinary surgeon");

replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="fate-of-animals-set-free"]');

@questions = ("health be assessed to determine whether it can be set free");
replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="fate-of-animals-rehomed"]');

@questions = (
"What types of animals do you intend to",
"health allows it to be rehomed",
"How will you ensure that rehoming does not pose a danger to public health, animal health, or the environment",
"What scheme is in place to ensure socialisation when an animal is rehomed",
"wellbeing when it is rehomed"
);
replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="fate-of-animals-used-in-other-projects"]');
clickOnThing($driver, '//button[text()=\'Continue\']','xpath','', 1);
selectThing($driver, '//*[@id="complete-true"]');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

clickOnThing($driver, 'a', 'tag_name', 'Purpose bred animals');

selectThing($driver, '//*[@id="purpose-bred-false"]');
@questions = ("Where will you obtain non-purpose bred animals from",
"you achieve your objectives by only using purpose bred animals");
replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Endangered animals');
selectThing($driver, '//*[@id="endangered-animals-true"]');
@questions = ("you achieve your objectives without using endangered animals",
"Explain how the project is for one of the permitted purposes");
replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Animals taken from the wild');
selectThing($driver, '//*[@id="wild-animals-true"]');
@questions = ("you achieve your objectives without using animals taken from the wild",
"How will these animals be captured",
"How will you minimise potential harms when catching these animals");

replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="non-target-species-capture-methods-true"]');
@questions = ('How will you minimise the risk of capturing non-target animals, including strays and animals of a different sex?',
"How will you ensure the competence of any person responsible for the capture of animals",
'How will you examine any animals that are found to be ill or injured at the time of capture');
replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="wild-animals-vet-false"]');
@questions = ("How will you ensure the competence of the person responsible for making this assessment");

replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="wild-animals-poor-health-true"]');

clickOnThing($driver, 'button', 'tag_name', 'Continue');
selectThing($driver, '//*[@id="wild-animals-marked-true"]');

@questions = (
'If sick or injured animals are to be treated, how will you transport them for treatment?',
'If sick or injured animals are to be humanely killed, which methods will you use?',
'How will animals be identified?'
);
replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="wild-animals-devices-true"]');
$driver->pause(1000);
@questions = (
'How will any adverse effects from a device',
'How will you locate and recapture the animals or otherwise ensure the devices are removed at the end of the regulated procedures?',
'If animals will not have devices removed, what are the potential effects on them, other animals, the environment and human health?'
);
replaceTextInMultiple($driver, \@questions, $textfile);

selectThing($driver, '//*[@id="wild-animals-declaration-true"]');
yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Feral animals');
selectThing($driver, '//*[@id="feral-animals-true"]');
@questions = (
"feral animals to achieve your objectives",
"Why is the use of feral animals essential to protect the health or welfare of that species or to avoid a serious threat to human or animal health or the environment",
"Which procedures will be carried out on feral animals");

replaceTextInMultiple($driver, \@questions, $textfile);


yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Re-using animals');
@questions = (
"Why do you intend to re-use animals",
"What are the limitations on re-using animals for this project");

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);


clickOnThing($driver, 'a', 'tag_name', 'Commercial slaughter');
selectThing($driver, '//*[@id="commercial-slaughter-true"]');

@questions = (
"How will you ensure that these animals are healthy and meet commercial requirements for meat hygiene to enable them to enter the food chain");
replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);


####clickOnThing($driver, 'a', 'tag_name', 'Neuromuscular blocking agents');
####
####@questions = ("Why do you need to use NMBAs in your protocols",
####"What anaesthetic and analgesic regime will you use",
####"How will you ensure that animals have adequate ventilation",
####"and distress for an animal under the influence of an NMBA");
####
####replaceTextInMultiple($driver, \@questions, $textfile);

#### clickOnThing($driver, 'button', 'tag_name', 'Continue');

####@questions = ("How will you monitor the depth of anaesthesia",
####"How will you ensure there are sufficient staff present throughout the use of NMBAs",
####"Explain the agreed emergency routine at your establishment that covers potential hazardous events");

####replaceTextInMultiple($driver, \@questions, $textfile);
####yesYesYes($driver);

####clickOnThing($driver, 'a', 'tag_name', 'Re-using animals');

####selectThing($driver, '//*[@id="reusing-animals-true"]');

####@questions = ("What types of animals will you be re",
####"Why do you intend to re",
####"What are the limitations on re-using animals for this project");

####replaceTextInMultiple($driver, \@questions, $textfile);
####yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Animals containing human material');

selectThing($driver, '//*[@id="animals-containing-human-material-true"]');
yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Replacement');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

@questions = (
"Why do you need to use animals to achieve the aim of your project",
"animal alternatives did you consider for use in this project",
"Why were they not suitable");

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver, 1);

clickOnThing($driver, 'a', 'tag_name', 'Setting animals free');

selectThing($driver, '//*[@id="setting-free-vet-false"]');

@questions = (
"s health be assessed to determine whether it can be set free",
"How will you ensure that setting animals free will not be harmful to other species, the environment, and human health",
"Will you rehabilitate animals before setting them free",
"Will you attempt to socialise any animals that you have set free",
"How will you prevent inadvertent re-use of animals that have been released at the end of procedures",
"If animals are lost to the study or not re-captured, how will you determine whether your project is complete",
"How will you ensure the competence of the person responsible for assessing whether animals can be set free");

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);

clickOnThing($driver, 'a', 'tag_name', 'Rehoming');
@questions = (
"What types of animals do you intend to rehome",
"s health allows it to be rehomed",
"How will you ensure that rehoming does not pose a danger to public health, animal health, or the environment",
"What scheme is in place to ensure socialisation when an animal is rehomed",
"What other measures will you take to safeguard an animal");

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver);


clickOnThing($driver, 'a', 'tag_name', 'Reduction');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

selectThing($driver, '//input[@type=\'text\']', 'reduction.*quantities');
replaceTextInThing($driver, '100');

@questions = (
"How have you estimated the numbers of animals you will use",
"What steps did you take during the experimental design phase to reduce the number of animals being used in this project",
"What measures, apart from good experimental design, will you use to optimise the number of animals you plan to use in your project");

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver, 1);

clickOnThing($driver, 'a', 'tag_name', 'Refinement');
clickOnThing($driver, 'button', 'tag_name', 'Continue');

@questions = (
"Which animal models and methods will you use during this project",
'How will you refine the procedures you',
"What published best practice guidance will you follow to ensure experiments are conducted in the most refined way"
);

replaceTextInMultiple($driver, \@questions, $textfile);
yesYesYes($driver, 1);

clickOnThing($driver, 'a', 'tag_name', 'Review');
selectThing($driver, '//*[@id="complete-true"]');
$driver->execute_script('window.confirm = function(msg) { return true; }');

clickOnThing($driver, 'button', 'tag_name', 'Continue');

$driver->execute_script('window.confirm = function(msg) { return true; }');

##clickOnThing($driver, 'a', 'tag_name', 'Word');
##clickOnThing($driver, 'a', 'tag_name', 'Backup');
submitApplication($driver, $textfile);

}


1;
