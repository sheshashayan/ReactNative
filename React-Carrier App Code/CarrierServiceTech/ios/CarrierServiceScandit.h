//
//  CarrierServiceScandit.h
//  CarrierServiceTech
//
//  Created by Kumar, Devendra C. on 01/03/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <ScanditBarcodeScanner/ScanditBarcodeScanner.h>


@interface CarrierServiceScandit : NSObject<RCTBridgeModule, SBSScanDelegate, SBSOverlayControllerDidCancelDelegate>

//@property(strong,nonatomic) UIButton *mybtn;
//@property (nonatomic, retain) UIWindow *window;
@property (nonatomic, retain) SBSBarcodePicker *picker;
@property (nonatomic) RCTResponseSenderBlock callbackObj;

@end
