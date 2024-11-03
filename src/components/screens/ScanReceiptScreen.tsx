import { ActivityIndicator } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { CameraService } from '../../services/CameraService';
import { OcrService } from '../../services/OcrService';

type ScanReceiptProps = {
    route: RouteProp<MainStackParamList, "ScanReceipt">,
    navigation: FrameNavigationProp<MainStackParamList, "ScanReceipt">,
};

export function ScanReceiptScreen({ navigation }: ScanReceiptProps) {
    const [scanning, setScanning] = React.useState(false);
    const [items, setItems] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const handleScanReceipt = async () => {
        try {
            setScanning(true);
            setError(null);

            const imageAsset = await CameraService.capturePhoto();
            if (!imageAsset) {
                throw new Error('Failed to capture photo');
            }

            const imageSource = await CameraService.getImageSource(imageAsset);
            const result = await OcrService.processImage(imageSource);

            if (result.items && result.items.length > 0) {
                setItems(result.items);
            } else {
                setError('No items found in receipt');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setScanning(false);
        }
    };

    const handleAddItems = () => {
        // TODO: Add items to inventory
        navigation.navigate('Dashboard');
    };

    return (
        <scrollView className="p-4">
            <label className="text-2xl font-bold mb-4">Scan Receipt</label>

            {scanning ? (
                <Card className="mb-4">
                    <stackLayout>
                        <activityIndicator busy={true} className="mb-2" />
                        <label className="text-center">Processing receipt...</label>
                    </stackLayout>
                </Card>
            ) : (
                <Button
                    text="Take Photo of Receipt"
                    variant="primary"
                    className="mb-4"
                    onTap={handleScanReceipt}
                />
            )}

            {error && (
                <Card className="mb-4 bg-red-100">
                    <label className="text-red-500">{error}</label>
                </Card>
            )}

            {items.length > 0 && (
                <Card className="mb-4">
                    <label className="text-xl font-bold mb-2">Detected Items</label>
                    <stackLayout className="mb-4">
                        {items.map((item, index) => (
                            <gridLayout key={index} columns="*, auto" className="mb-2">
                                <label col="0">{item.name}</label>
                                <label col="1">${item.price?.toFixed(2)}</label>
                            </gridLayout>
                        ))}
                    </stackLayout>
                    <Button
                        text="Add All Items"
                        variant="secondary"
                        onTap={handleAddItems}
                    />
                </Card>
            )}
        </scrollView>
    );
}