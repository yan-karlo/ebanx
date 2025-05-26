import json
from datetime import datetime
import schemathesis
from schemathesis.types import NotSet

API_URL = "http://app:3000"

schema = schemathesis.from_uri(f"{API_URL}/openapi.yaml")


def log_request(case, response):
    def safe_json(obj):
        if isinstance(obj, NotSet):
            return None
        try:
            json.dumps(obj)
            return obj
        except Exception:
            return str(obj)

    log_entry = {
        "method": case.method,
        "path": case.path,
        "path_parameters": safe_json(case.path_parameters),
        "query": safe_json(case.query),
        "headers": safe_json(case.headers),
        "cookies": safe_json(case.cookies),
        "body": safe_json(case.body),
        "response_status_code": response.status_code,
        "response_body": safe_json(response.text),
    }

    timestamp = datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    with open(f"log_{timestamp}.json", "w") as f:
        json.dump(log_entry, f, indent=2)


@schema.parametrize()
def test_api(case):
    response = case.call()
    case.validate_response(response)
    log_request(case, response)
