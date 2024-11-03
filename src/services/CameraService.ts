import { ImageAsset, ImageSource, takePicture, requestPermissions } from '@nativescript/core';

export class CameraService {
    static async requestCameraPermission(): Promise<boolean> {
        const result = await requestPermissions();
        return result.camera;
    }

    static async capturePhoto(): Promise<ImageAsset | null> {
        const hasPermission = await this.requestCameraPermission();
        if (!hasPermission) {
            throw new Error('Camera permission denied');
        }

        try {
            const options = {
                width: 1280,
                height: 960,
                keepAspectRatio: true,
                saveToGallery: false
            };

            const imageAsset = await takePicture(options);
            return imageAsset;
        } catch (error) {
            console.error('Error taking picture:', error);
            return null;
        }
    }

    static async getImageSource(imageAsset: ImageAsset): Promise<ImageSource> {
        return await ImageSource.fromAsset(imageAsset);
    }
}