"""
Command line utility to check Passwords or create passwords using same Django logic
Requires Django installation
Andres Cardenas
28/02/2014
"""
import django
from django.conf import settings
from django.conf import global_settings
if not settings.configured:
    settings.configure(global_settings, DEBUG=True)
import sys
from django.contrib.auth import hashers

"""
If first argument is "check"
Used to validate if a password matches a hash using Django hashing functions
Takes the plain text password and the hash as input.
Returns 1 if the passwords match
Returns 0 if the passwords do not match
Returns -1 if the hashed input password is not a valid hash 

If first argument is "make"
Used to create a hashed password using Django hashing functions
Takes the plain text password as input.
Returns the hash for the input password
if the input password is null it returns a not valid hash
"""
if sys.argv[1] == "check":

	raw =  sys.argv[2]
	hash = sys.argv[3]
	if hashers.is_password_usable(hash):
		if hashers.check_password(raw,hash):
			sys.stdout.write("1")
			sys.stdout.flush()
			sys.exit(0)
		else:
			sys.stdout.write("0")
			sys.stdout.flush()
			sys.exit(0)
	else:
		sys.stdout.write("-1")
		sys.stdout.flush()
		sys.exit(0)

elif sys.argv[1] == "make":
	raw =  sys.argv[2]
	hash = hashers.make_password(raw)
	sys.stdout.write(hash)
	sys.stdout.flush()
	sys.exit(0)

else: 
	sys.exit(0)