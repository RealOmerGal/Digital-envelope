
# Digital Envelope
 an event managment software used by both the event's creators and its guests
## Functionallity
### As a guest
- Scan the event's published QR code
- Fill out your name and your desired blessing
- Pay safely with Stripe
- Do not to authenticate

## As an event owner
- Authenticate with Google account
- Create a new event, edit or delete an existing one
- Geneate a QR code and publish it however you would like
- Display your event's blessings at any time
- Recieve an event overview and insights in the dashboard section
- Open or close the event for new blessings

## Technologies and design
### Front-end
 - React with Typescript
 - Material-ui for general styling
 - Zustand for client global state managment
### Back-end
- Nestjs 
- Typeorm and PostgreSQL
### Infrastracture
As this project is still in development, it runs on a local kubernetes cluster
the 3 deployments (client,server and db) are connected to Ingress-nginx load balancer
It uses Skaffold.dev for automatic development pipline

## Future updates
- Replace Zustand for a server state managment (React-query)
- First production version: 
    - Host the project on cloud provider
    - Set-up Ci\Cd pipeline
