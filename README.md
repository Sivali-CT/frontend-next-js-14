# Leads Generation Web App
This is solely for demonstration purposes.

![homepage](https://res.cloudinary.com/andinianst93/image/upload/v1703882780/Screenshot_from_2023-12-30_03-43-27_cflp3i.png)
![service page](https://res.cloudinary.com/andinianst93/image/upload/v1703882780/Screenshot_from_2023-12-30_03-43-34_ypmgcz.png)
![about page](https://res.cloudinary.com/andinianst93/image/upload/v1703882779/Screenshot_from_2023-12-30_03-43-38_i8evff.png)
![contact page](https://res.cloudinary.com/andinianst93/image/upload/v1703882779/Screenshot_from_2023-12-30_03-43-42_iohkti.png)
![blog page](https://res.cloudinary.com/andinianst93/image/upload/v1703882779/Screenshot_from_2023-12-30_03-43-48_mhjpns.png)


This web application works in conjunction with Strapi CMS and Django Rest Framework for form submissions and comments.

## K8s

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: frontend
  namespace: development
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: frontend 
  template:
    metadata:
      labels:
        tier: frontend 
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: tier
                operator: In
                values:
                - frontend
      containers:
      - name: frontend
        image: svlct/webapp-leads-generation:v6
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: frontend-dev-secret
        resources:
          requests:
            cpu: "100m"
            memory: "1Gi"
          limits:
            cpu: "200m"
            memory: "2Gi"

---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: development
spec:
  selector:
    tier: frontend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: ClusterIP

```
### Secret
```bash
k create secret generic frontend-dev-secret -n development \
    --from-literal=NEXT_PUBLIC_API_URL=yourvalue \
    --from-literal=NEXT_PUBLIC_TOKEN=yourvalue \
    --from-literal=NEXT_PUBLIC_CONTACT_FORM=yourvalue\
    --from-literal=NEXT_PUBLIC_COMMENT=yourvalue \
    --from-literal=NEXT_PUBLIC_SINGLE_COMMENT=yourvalue \
    --from-literal=NODE_ENV=production


```

**notes:**:
If you want to build the Next app as static pages please change the next.config.js and the Dockerfile since the nginx/default.conf already provided.