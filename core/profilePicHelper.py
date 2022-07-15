import base64
from tkinter import E

class ProfilePicHelper:
    @staticmethod
    def getProfilePic(id):
        try:
            with open(f"./core/profile/{id}.jpg", "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())
        except:
            with open(f"./core/profile/default.txt", "r") as image_file:
                encoded_string = image_file.read()
        image_file.close()
        return encoded_string

    @staticmethod
    def saveProfilePic(id, encoded_pic):
        try:
            with open(f"./core/profile/{id}.jpg", "wb") as image:
                image.write(base64.b64decode(encoded_pic))
                image.close()
            return True
        except Exception as e:
            print(e)
        return False