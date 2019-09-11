use strict;
use warnings;
use 5.010;
     
use Test::Simple tests => 3;
use Test_Li;
use Test_Rl;
use Test_Gl;

ok(test_li("holc", "dev", "text.txt")==0);
ok(test_rl("inspector", "dev", "text.txt") == 0);
ok(test_gl("licensing", "dev", "text.txt") == 0);
