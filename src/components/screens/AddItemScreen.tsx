import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { CameraService } from '../../services/CameraService';
import { OcrService } from '../../services/OcrService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type AddItemProps = {
    route: RouteProp<MainStackParamList, "AddItem">,
    navigation: FrameNavigationProp<MainStackParamList, "AddItem">,
};

export function AddItemScreen({ navigation }: AddItemProps) {
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleTakePhoto = async () => {
        try {
            setProcessing(true);
            setError(null);

            const imageAsset = await CameraService.capturePhoto();
            if (!imageAsset) {
                throw new Error('Failed to capture photo');
            }

            const imageSource = await CameraService.getImageSource(imageAsset);
            // Process the image to identify the food item
            // TODO: Implement food recognition AI
            
            // For now, just navigate back
            navigation.goBack();
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <scrollView className="p-4">
            <stackLayout>
                <label className="text-2xl font-bold mb-4">Add New Item</label>
                
                {/* Input Form */}
                <Card className="mb-4">
                    <stackLayout>
                        <label className="font-bold mb-1">Item Name</label>
                        <textField 
                            className="p-2 bg-white rounded-lg border-gray-300 border-width-1"
                            hint="Enter item name"
                        />
                    </stackLayout>

                    <stackLayout className="mt-4">
                        <label className="font-bold mb-1">Expiry Date</label>
                        <datePicker className="mb-2" />
                    </stackLayout>

                    <stackLayout className="mt-4">
                        <label className="font-bold mb-1">Category</label>
                        <button className="p-2 bg-white rounded-lg border-gray-300 border-width-1 text-left">
                            Select Category
                        </button>
                    </stackLayout>
                </Card>

                {/* Action Buttons */}
                <gridLayout columns="*, *" className="gap-2 mb-4">
                    <Button 
                        col="0"
                        text="Cancel"
                        variant="danger"
                        onTap={() => navigation.goBack()}
                    />
                    <Button 
                        col="1"
                        text="Save Item"
                        variant="primary"
                        onTap={() => {
                            // TODO: Save item
                            navigation.goBack();
                        }}
                    />
                </gridLayout>

                {error && (
                    <Card className="mb-4 bg-red-100">
                        <label className="text-red-500">{error}</label>
                    </Card>
                )}

                {/* Quick Add Options */}
                <Card>
                    <label className="text-xl font-bold mb-2">Quick Add Options</label>
                    <Button
                        text="Scan Barcode"
                        variant="secondary"
                        className="mb-2"
                        onTap={() => {/* TODO: Implement barcode scanning */}}
                    />
                    <Button
                        text="Take Photo"
                        variant="secondary"
                        className="mb-2"
                        onTap={handleTakePhoto}
                    />
                    <Button
                        text="Scan Receipt"
                        variant="secondary"
                        onTap={() => navigation.navigate('ScanReceipt')}
                    />
                </Card>

                {processing && (
                    <Card className="mt-4">
                        <stackLayout>
                            <activityIndicator busy={true} className="mb-2" />
                            <label className="text-center">Processing image...</label>
                        </stackLayout>
                    </Card>
                )}
            </stackLayout>
        </scrollView>
    );
}