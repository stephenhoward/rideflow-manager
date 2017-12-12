# Rideflow Manager

This is a web front-end for managing a RideFlow based transit service.

## Installing

First, you will need to have downloaded a copy of RideFlow and built a VM for it using Vagrant and Ansible.

Next, run this project's Ansible playbook against the same VM. Vagrant provide you with a generated host list to work with.  It will probably look something like this:

    > ansible-playbook -i ../rideflow/vagrant/server/.vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory ansible/playbook.yaml

Finally:

    > vagrant ssh
    > cd /host-web
    > brunch build

Then if you visit your VM through a browser, you should see the project up and running.
