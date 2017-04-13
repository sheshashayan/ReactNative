//
//  CarrierServiceScandit.m
//  CarrierServiceTech
//
//  Created by Kumar, Devendra C. on 01/03/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "CarrierServiceScandit.h"



@implementation CarrierServiceScandit
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(barcodeScanner:(NSString*)key:(RCTResponseSenderBlock)callbackObj) {
  //global CallbackObj assign to local callBack
  [SBSLicense setAppKey:key];
  
  self.callbackObj = callbackObj;
  SBSScanSettings* settings = [SBSScanSettings defaultSettings];
  
  //By default, all symbologies are turned off so you need to explicity enable the desired simbologies.
  NSSet *symbologiesToEnable = [NSSet setWithObjects:
                                @(SBSSymbologyEAN13) ,
                                @(SBSSymbologyUPC12),
                                @(SBSSymbologyEAN8),
                                @(SBSSymbologyUPCE),
                                @(SBSSymbologyCode39) ,
                                @(SBSSymbologyCode128),
                                @(SBSSymbologyITF),
                                @(SBSSymbologyQR),
                                @(SBSSymbologyDatamatrix), nil];
  [settings enableSymbologies:symbologiesToEnable];
  
  
  // Some 1d barcode symbologies allow you to encode variable-length data. By default, the
  // Scandit BarcodeScanner SDK only scans barcodes in a certain length range. If your
  // application requires scanning of one of these symbologies, and the length is falling
  // outside the default range, you may need to adjust the "active symbol counts" for this
  // symbology. This is shown in the following 3 lines of code.
  
  SBSSymbologySettings *symSettings = [settings settingsForSymbology:SBSSymbologyCode39];
  symSettings.activeSymbolCounts =
  [NSSet setWithObjects:@7, @8, @9, @10, @11, @12, @13, @14, @15, @16, @17, @18, @19, @20, nil];
  // For details on defaults and how to calculate the symbol counts for each symbology, take
  // a look at http://docs.scandit.com/stable/c_api/symbologies.html.
  
  // Initialize the barcode picker - make sure you set the app key above
  self.picker = [[SBSBarcodePicker alloc] initWithSettings:settings];
  
  // only show camera switch button on tablets. For all other devices the switch button is
  // hidden, even if they have a front camera.
  [self.picker.overlayController setCameraSwitchVisibility:SBSCameraSwitchVisibilityOnTablet];
  [self.picker.overlayController setCancelDelegate:self];
  [self.picker.overlayController showToolBar:TRUE];
  // set the allowed interface orientations. The value UIInterfaceOrientationMaskAll is the
  // default and is only shown here for completeness.
  [self.picker setAllowedInterfaceOrientations:UIInterfaceOrientationMaskAll];
  // Set the delegate to receive scan event callbacks
  self.picker.scanDelegate = self;
  
  // Open the camera and start scanning barcodes
  [self.picker startScanning];
  self.picker.view.userInteractionEnabled =YES;
//  self.mybtn.userInteractionEnabled =YES;
  
  self.picker.view.shouldGroupAccessibilityChildren =YES;
  // Show the barcode picker view
  //[window makeKeyAndVisible];
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:self.picker animated:YES completion:nil];
  });
  
  
}
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation {
  return NO;
}

//! [SBSScanDelegate callback]
/**
 * This delegate method of the SBSScanDelegate protocol needs to be implemented by
 * every app that uses the Scandit Barcode Scanner and this is where the custom application logic
 * goes. In the example below, we are just showing an alert view with the result.
 */
- (void)barcodePicker:(SBSBarcodePicker *)thePicker didScan:(SBSScanSession *)session
{
  // call stopScanning on the session to immediately stop scanning and close the camera. This
  // is the preferred way to stop scanning barcodes from the SBSScanDelegate as it is made sure
  // that no new codes are scanned. When calling stopScanning on the picker, another code may be
  // scanned before stopScanning has completely stoppen the scanning process.
  [session stopScanning];
  
  SBSCode *code = [session.newlyRecognizedCodes objectAtIndex:0];
  // the barcodePicker:didScan delegate method is invoked from a picker-internal queue. To display
  // the results in the UI, you need to dispatch to the main queue. Note that it's not allowed
  // to use SBSScanSession in the dispatched block as it's only allowed to access the
  // SBSScanSession inside the barcodePicker:didScan callback. It is however safe to use results
  // returned by session.newlyRecognizedCodes etc.
//  dispatch_async(dispatch_get_main_queue(), ^{
//    NSString *barcode = code.data;
//    
//    // Selector for sending callback result
//    [self performSelectorOnMainThread:@selector(sent:) withObject:barcode waitUntilDone:NO];
//  });
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.picker dismissViewControllerAnimated:NO completion:^{
      NSString *barcode = code.data;
      
      // Selector for sending callback result
      [self performSelectorOnMainThread:@selector(sent:) withObject:barcode waitUntilDone:NO];

    }];
  });
}


- (void)overlayController:(nonnull SBSOverlayController *)overlayController
      didCancelWithStatus:(nullable NSDictionary *)status{
  // Check if torch is switched on, before cancel switched off
  AVCaptureDevice * captDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
  if ([captDevice hasTorch] && captDevice.torchMode == AVCaptureTorchModeOn) {
      [captDevice lockForConfiguration:nil];
      [captDevice setTorchMode:AVCaptureTorchModeOff];
      [captDevice unlockForConfiguration];
   }
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [self.picker dismissViewControllerAnimated:NO completion:nil];
    
  });


}

//! [SBSScanDelegate callback]
-(void)sent:(NSString*) result
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [self scanResult:result];
  });
  
}
-(void) scanResult:(NSString*) scanData
{
  
  // NSArray * result = [NSArray arrayWithObjects:scanData, nil];//[[NSArray alloc] initWithObjects:scanData, nil];
  self.callbackObj(@[[NSNull null], scanData]);
  //  executeClosure(self.callbackObj, result, NO);
  
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
  [self.picker startScanning];
}




RCT_EXPORT_METHOD(isDevSupportCalling:(RCTResponseSenderBlock)callbackObj) {
  
  BOOL isSupportCall = [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"tel://"]];
  callbackObj(@[@(isSupportCall)]);
}
@end


