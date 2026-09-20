"""
IBVAP – Intelligent Border Video Analytics Platform — Fast2SMS Real Cellular SMS Gateway Dispatcher
Supports GET & POST requests to https://www.fast2sms.com/dev/bulkV2
"""

import os
import requests
import urllib.parse
from typing import Dict, Any

def send_fast2sms_get(mobile_number: str, message_text: str, api_key: str = "") -> Dict[str, Any]:
    """
    Sends a real SMS to an Indian mobile number using the Fast2SMS GET API endpoint:
    GET https://www.fast2sms.com/dev/bulkV2?route=q&message=...&numbers=...
    Header: Authorization: YOUR_API_KEY
    """
    key = api_key or os.environ.get("FAST2SMS_API_KEY", "")

    # Clean 10-digit Indian phone number
    clean_number = "".join(filter(str.isdigit, mobile_number))
    if len(clean_number) > 10:
        clean_number = clean_number[-10:]

    # URL encode message
    encoded_message = urllib.parse.quote(message_text)

    # Construct exact Fast2SMS GET URL
    url = f"https://www.fast2sms.com/dev/bulkV2?route=q&message={encoded_message}&numbers={clean_number}"

    headers = {
        "authorization": key,
        "cache-control": "no-cache"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        return response.json()
    except Exception as e:
        return {"return": False, "message": str(e)}

if __name__ == "__main__":
    print("Fast2SMS Gateway Dispatcher module ready.")
