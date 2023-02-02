
# Digital Envelope
 An event managment software used by both the event's creators and its guests
## Functionallity
### As a guest
- Scan the event's published QR code
- Fill out your name and your desired blessing
- Pay safely with Stripe
- Do not need to authenticate

## As an event owner
- Authenticate with Google account
- Create a new event, edit or delete an existing one
- Geneate a QR code and publish it however you would like
- Display your event's blessings at any time
- Recieve an event overview and insights in the dashboard section
- Open or close the event for new blessings

## Entity Relationship Diagram
 ![alt text](https://drive.google.com/uc?id=1yYCPGv8nJ7Qiih6OqWGMtAviBjvto40P)

## Technologies and design
### Front-end
 - React with Typescript
 - Material-ui for general styling
 - Zustand for client global state managment
### Back-end
- Nestjs 
- Typeorm and PostgreSQL

### Infrastracture
The project using Kubernetes for the infrastracture in the following form:
 - Deployments and Services for the client and the server.
 - An Ingress-Nginx Controller is connected to the two services and defines the routing rules between them
 - A PostgreSQL Deployment, Service, ConfigMap and a PersistentVolume for the purposes of configuring, connecting to the server and persisting data. 

## Future updates
   - Host the project on cloud provider as the first production version
   - Set-up ci\cd pipeline
