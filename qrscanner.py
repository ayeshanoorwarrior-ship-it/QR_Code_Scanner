import cv2
from pyzbar.pyzbar import decode
import time

cam = cv2.VideoCapture(0)
cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

camera = True
while camera == True:
    success, frame = cam.read()
    if not success:
        print("Failed to capture")
        break

    for i in decode(frame):
        print(i.type)
        print(i.data.decode('utf-8'))
        time.sleep(3)

        cv2.imshow('QR Scanner', frame)
        if cv2.waitKey(1) == ord('q'):
            break

cam.release()
cv2.destroyAllWindows()

