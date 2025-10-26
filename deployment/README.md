# Canva App - Ansible Deployment

This directory contains Ansible automation for deploying the Canva app across multiple VMs with load balancing.

## Architecture

- 1 Load Balancer VM (Nginx with SSL)
- 2 App Server VMs (Docker containers)

## Usage

```bash
cd deployment

# Test connectivity
ansible all -m ping

# Run full deployment
ansible-playbook playbook.yml

# Deploy only to load balancer
ansible-playbook playbook.yml --tags loadbalancer

# Deploy only to app servers
ansible-playbook playbook.yml --tags appserver
```

## Inventory

Edit `inventory/hosts.ini` to match your VMs' IP addresses.

## Variables

- `group_vars/all.yml` - Global variables
- `group_vars/loadbalancer.yml` - Load balancer specific
- `group_vars/appservers.yml` - App servers specific
