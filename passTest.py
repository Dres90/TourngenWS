import django
from django.conf import settings
from django.conf import global_settings
if not settings.configured:
    settings.configure(global_settings, DEBUG=True)
import sys
from django.contrib.auth import hashers

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
		sys.stdout.write("1")
		sys.stdout.flush()
		sys.exit(-1)
		
elif sys.argv[1] == "make":
	raw =  sys.argv[2]
	hash = hashers.make_password(raw)
	sys.stdout.write(hash)
	sys.stdout.flush()
	sys.exit(0)

else: 
	sys.exit(0)