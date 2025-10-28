# Canva App - Ansible Deployment

This directory contains Ansible automation for deploying the Canva app across multiple VMs with load balancing and SSL termination.

## Architecture

- **2 App Server VMs**: Run Next.js app in Docker containers (port 3000)
- **1 Load Balancer VM**: Nginx reverse proxy with SSL and round-robin load balancing

```
[Internet] → [Nginx LB:443] → [App1:3000] 
                            → [App2:3000]
```

## Prerequisites

- Ansible installed on control machine
- SSH access to all VMs (root user)
- Python 3 on target servers
- SSL certificates (Let's Encrypt recommended)
- Domain name configured

## Quick Start

### 1. Configure Inventory

Edit `inventory/hosts.ini` with your server IPs:

```ini
[loadbalancer]
lb1 ansible_host=YOUR_LB_IP ansible_user=root

[appservers]
app1 ansible_host=YOUR_APP1_IP ansible_user=root server_id=Server-1
app2 ansible_host=YOUR_APP2_IP ansible_user=root server_id=Server-2
```

### 2. Configure Load Balancer

Edit `group_vars/loadbalancer.yml` with your app server IPs:

```yaml
upstream_servers:
  - host: YOUR_APP1_IP
    port: 3000
  - host: YOUR_APP2_IP
    port: 3000
```

### 3. Deploy

Choose one of two deployment options:

**Option A: Standard (docker.io from apt)**
```bash
ansible-playbook -i inventory/hosts.ini playbook.yml
```

**Option B: Latest Docker (recommended)**
```bash
ansible-playbook -i inventory/hosts.ini playbook-v2.yml
```

## Playbooks

### `playbook.yml`
Standard deployment using `docker.io` from Ubuntu apt repositories.
- Uses `docker-compose` (v1 syntax)
- Good for Ubuntu LTS compatibility

### `playbook-v2.yml`
Modern deployment using Docker's official installation script.
- Installs latest Docker Engine from `get.docker.com`
- Uses `docker compose` (v2 syntax)
- Recommended for production

### `cleanup-playbook.yml`
**Complete cleanup** - removes everything installed by deployment:
```bash
ansible-playbook -i inventory/hosts.ini cleanup-playbook.yml
```

⚠️ **WARNING**: Removes Docker, Nginx, git, all containers, images, volumes, and application files. Use to reset servers to clean state.

## What Gets Deployed

### App Servers
1. Git (for cloning repository)
2. Docker & Docker Compose
3. Application code (cloned to `/root/canva`)
4. Environment variables (`.env` with unique `SERVER_ID`)
5. Docker container running Next.js app on port 3000

### Load Balancer
1. Nginx web server
2. SSL/TLS configuration (HTTPS)
3. Round-robin load balancing
4. HTTP to HTTPS redirect
5. Proxy headers for client IP forwarding

## Configuration Files

### `group_vars/all.yml`
Global variables for all servers:
```yaml
domain_name: mohamedlala.online
ssl_cert_path: /etc/letsencrypt/live/mohamedlala.online/fullchain.pem
ssl_key_path: /etc/letsencrypt/live/mohamedlala.online/privkey.pem
app_port: 3000
app_branch: master
app_directory: /opt/canva
```

### `group_vars/appservers.yml`
App server specific configuration.

### `group_vars/loadbalancer.yml`
Nginx upstream server configuration.

## Verification

### Test Connectivity
```bash
ansible all -i inventory/hosts.ini -m ping
```

### Check Application Servers
```bash
# SSH to app server
ssh root@YOUR_APP_IP

# View running containers
docker ps

# Check logs
docker logs myappcanva
```

### Check Load Balancer
```bash
# SSH to load balancer
ssh root@YOUR_LB_IP

# Check Nginx status
systemctl status nginx

# Test configuration
nginx -t

# View logs
tail -f /var/log/nginx/access.log
```

### Test Load Balancing
Visit your domain and refresh multiple times. You should see different `SERVER_ID` values:

```bash
# Test with curl
for i in {1..10}; do
  curl -k https://mohamedlala.online | grep SERVER_ID
done
```

## SSL Certificate Setup

Obtain SSL certificates using Let's Encrypt (on load balancer):

```bash
apt update
apt install certbot
certbot certonly --standalone -d your-domain.com
```

Update certificate paths in `group_vars/all.yml`.

## Updating Application

To deploy code changes:

1. Push changes to GitHub repository
2. Re-run deployment playbook:
   ```bash
   ansible-playbook -i inventory/hosts.ini playbook-v2.yml
   ```

The playbook will pull the latest code and rebuild containers.

## Troubleshooting

### Deployment fails
Run with verbose output:
```bash
ansible-playbook -i inventory/hosts.ini playbook-v2.yml -vvv
```

### Git clone fails
Ensure servers have internet access and can reach GitHub.

### Docker build fails
Check Docker service: `systemctl status docker`

### Nginx won't start
Verify SSL certificate paths exist and are readable.

### Load balancing not working
Check upstream server IPs in Nginx configuration match your app servers.

## Common Commands

```bash
# Deploy to specific hosts
ansible-playbook -i inventory/hosts.ini playbook-v2.yml --limit app1

# Check playbook syntax
ansible-playbook -i inventory/hosts.ini playbook-v2.yml --syntax-check

# Dry run (check mode)
ansible-playbook -i inventory/hosts.ini playbook-v2.yml --check

# List all hosts
ansible all -i inventory/hosts.ini --list-hosts

# Run ad-hoc command
ansible appservers -i inventory/hosts.ini -a "docker ps"
```

## Security Best Practices

- Use SSH keys instead of passwords
- Change default SSH port
- Configure firewall (UFW/iptables)
- Keep SSL certificates up to date
- Regularly update packages
- Use Ansible Vault for sensitive data
- Implement rate limiting in Nginx
- Regular security audits

## Maintenance

### Renew SSL Certificates
```bash
certbot renew
systemctl reload nginx
```

### Update Docker Images
```bash
cd /root/canva
docker compose pull
docker compose up -d
```

### View Application Logs
```bash
docker logs -f myappcanva
```

### Backup
Important directories to backup:
- `/root/canva` - Application code
- `/etc/nginx/sites-available` - Nginx config
- `/etc/letsencrypt` - SSL certificates

## Project Structure

```
deployment/
├── README.md                 # This file
├── playbook.yml              # Standard deployment
├── playbook-v2.yml           # Modern deployment (recommended)
├── cleanup-playbook.yml      # Complete cleanup
├── ansible.cfg               # Ansible configuration
├── inventory/
│   └── hosts.ini            # Server inventory
└── group_vars/
    ├── all.yml              # Global variables
    ├── appservers.yml       # App server variables
    └── loadbalancer.yml     # Load balancer variables
```

## Support

For issues or questions, please open an issue on the GitHub repository.
