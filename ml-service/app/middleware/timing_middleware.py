from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TimingMiddleware(BaseHTTPMiddleware):
  
  async def dispatch(self, request: Request, call_next):

    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url.path} - {process_time:.3f}s")

    response.headers["X-Process-Time"] = str(round(process_time, 3))
        
    return response