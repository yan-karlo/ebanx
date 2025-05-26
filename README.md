## 📘 README.md — API OpenAPI Test Environment

### 📌 Overview

This project provides a sandbox environment to test and validate an API based on an OpenAPI 3.0.3 specification using tools like **Schemathesis**, **Prism**, and optionally **Dredd**. It's dockerized, reproducible, and designed for safe experimentation.

---

### ⚙️ Architecture Summary

* **Node.js + TypeScript API**
* **Schemathesis**: for fuzz, schema, and contract testing
* **Prism**: for mocking API responses
* **cURL container**: for seeding initial test data
* **Watch-tower**: for interactive testing or debugging inside the Docker network

---

### ▶️ Running the Environment

1. Clone the project:

```bash
git clone <repo_url>
cd <project_folder>
```

2. Build and run:

```bash
docker compose up --build
```

This will:

* Spin up your API (`app`)
* Wait for health check (`/ping`)
* Seed initial data (`curl`)
* Run automated tests (`schemathesis`)
* Provide a mock interface (`prism`) at `http://localhost:8080`

---

### 🔬 Schemathesis Testing

Runs automatically via `docker-compose`.
Generates a full validation of all OpenAPI-defined behaviors:

* Schema validation
* Response status correctness
* `oneOf` / `discriminator` structure check
* Fuzz testing with up to 50 variations per case

Results are saved to:

```bash
./reports/ci-report.xml
```

To run manually:

```bash
docker compose run --rm schemathesis
```

---

### 🧪 API Seeding via curl

The `curl` container will:

```bash
POST /reset
POST /event { type: "deposit", destination: "123", amount: 1000 }
```

You can tweak these commands inside `docker-compose.yml`.

---

### 🤖 Prism Mock Server

Use Prism to mock your API locally:

```bash
http://localhost:8080/event
http://localhost:8080/balance?account_id=123
```

Great for frontends, simulations, and sandbox demos.

---

### 🚫 Dredd (Optional)

Dredd is **disabled by default** because it does not support OpenAPI 3.0 advanced features (`oneOf`, `discriminator`). If needed, you can activate and adjust it in `docker-compose.yml` under the `dredd` service.

---

### 🤝 CI/CD Integration (GitHub Actions)

**.github/workflows/api-test.yml**:

```yaml
name: API Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  openapi-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Run test suite
        run: |
          docker compose up --build --abort-on-container-exit

      - name: Upload test report
        uses: actions/upload-artifact@v3
        with:
          name: schemathesis-report
          path: ./reports/ci-report.xml
```

---

### 🧾 Benchmark Summary

| Criteria                | Schemathesis       | Dredd                 | Prism                      |
| ----------------------- | ------------------ | --------------------- | -------------------------- |
| **OpenAPI 3.0 Support** | ✅ Full             | ⚠️ Partial            | ✅ Full                     |
| **Response Validation** | ✅ Deep             | ✅ Superficial         | ⚠️ Simulated only          |
| **JSON Schema**         | ✅ Full             | ⚠️ Partial            | ❌ None                     |
| **Fuzz Testing**        | ✅ Yes (Hypothesis) | ❌ No                  | ❌ No                       |
| **Automated Testing**   | ✅ CLI, CI/CD-ready | ✅ Basic CLI           | ❌ Not for testing          |
| **Mocking**             | ❌ No               | ❌ No                  | ✅ Yes                      |
| **Contract Check**      | ✅ Accurate         | ✅ Path & payload      | ✅ Partial (mock-based)     |
| **oneOf/allOf Support** | ✅ Yes              | ❌ No                  | ✅ Yes                      |
| **Use Case**            | Robust QA testing  | Smoke/contract checks | Frontend & sandbox mocking |
| **Ease of Use**         | Medium             | High                  | High                       |
| **CI Integration**      | ✅ Excellent        | ✅ Good                | ⚠️ Not recommended         |

---

### 📂 Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── openapi.yaml
├── reports/
├── src/
│   └── app.ts
├── tests/
├── watch-tower/
└── README.md  <-- you are here
```

---

### 🙌 Credits

Developed by Yan for EBANX challenge. Built with love, TypeScript, and OpenAPI 🧠
