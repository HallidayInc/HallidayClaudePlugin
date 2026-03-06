import { z } from 'zod';

declare const Address: z.ZodString;
type Address = z.infer<typeof Address>;

declare const TransactionRequest: z.ZodObject<{
    to: z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>;
    from: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    nonce: z.ZodOptional<z.ZodNumber>;
    gasLimit: z.ZodOptional<z.ZodBigInt>;
    gasPrice: z.ZodOptional<z.ZodBigInt>;
    maxPriorityFeePerGas: z.ZodOptional<z.ZodBigInt>;
    maxFeePerGas: z.ZodOptional<z.ZodBigInt>;
    data: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodBigInt>;
    chainId: z.ZodNumber;
}, z.core.$strip>;
type TransactionRequest = z.infer<typeof TransactionRequest>;
declare const TransactionReceipt: z.ZodObject<{
    transactionHash: z.ZodOptional<z.ZodString>;
    blockHash: z.ZodOptional<z.ZodString>;
    blockNumber: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    to: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<`0x${string}`, string>>>;
    rawReceipt: z.ZodAny;
}, z.core.$strip>;
type TransactionReceipt = z.infer<typeof TransactionReceipt>;
declare const EVMChainConfig: z.ZodObject<{
    chain_id: z.ZodBigInt;
    network: z.ZodString;
    explorer: z.ZodOptional<z.ZodURL>;
    image: z.ZodOptional<z.ZodURL>;
    is_testnet: z.ZodBoolean;
    address_family: z.ZodLiteral<"EVM">;
    native_currency: z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
    }, z.core.$strip>;
    rpc: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type EVMChainConfig = z.infer<typeof EVMChainConfig>;

declare const TypedData: z.ZodString;
type TypedData = z.infer<typeof TypedData>;

declare const WindowType: z.ZodEnum<{
    EMBED: "EMBED";
    POPUP: "POPUP";
    MODAL: "MODAL";
}>;
type WindowType = z.infer<typeof WindowType>;
declare const TextMode: z.ZodEnum<{
    DEFAULT: "DEFAULT";
    ALL_UPPERCASE: "ALL_UPPERCASE";
}>;
type TextMode = z.infer<typeof TextMode>;
declare const FontWeight: z.ZodEnum<{
    AUTO: "AUTO";
    MEDIUM: "MEDIUM";
}>;
type FontWeight = z.infer<typeof FontWeight>;
declare const PaymentCategoryGrouping: z.ZodEnum<{
    ATTACHED: "ATTACHED";
    BUTTON: "BUTTON";
}>;
type PaymentCategoryGrouping = z.infer<typeof PaymentCategoryGrouping>;
declare const BorderStyle: z.ZodEnum<{
    SQUARE: "SQUARE";
    DEFAULT: "DEFAULT";
}>;
type BorderStyle = z.infer<typeof BorderStyle>;
declare const BackgroundStyle: z.ZodEnum<{
    BLUR: "BLUR";
    OFF: "OFF";
}>;
type BackgroundStyle = z.infer<typeof BackgroundStyle>;
declare const CssFontSize: z.ZodString;
type CssFontSize = z.infer<typeof CssFontSize>;
declare const CustomStyles: z.ZodObject<{
    primaryColor: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    borderColor: z.ZodOptional<z.ZodString>;
    textColor: z.ZodOptional<z.ZodString>;
    textSecondaryColor: z.ZodOptional<z.ZodString>;
    accentColor: z.ZodOptional<z.ZodString>;
    componentShadow: z.ZodOptional<z.ZodString>;
    borderStyle: z.ZodOptional<z.ZodEnum<{
        SQUARE: "SQUARE";
        DEFAULT: "DEFAULT";
    }>>;
    textMode: z.ZodOptional<z.ZodEnum<{
        DEFAULT: "DEFAULT";
        ALL_UPPERCASE: "ALL_UPPERCASE";
    }>>;
    paymentCategoryGrouping: z.ZodOptional<z.ZodEnum<{
        ATTACHED: "ATTACHED";
        BUTTON: "BUTTON";
    }>>;
    fontWeight: z.ZodOptional<z.ZodEnum<{
        AUTO: "AUTO";
        MEDIUM: "MEDIUM";
    }>>;
    baseFontSize: z.ZodOptional<z.ZodString>;
    baseBorderRadius: z.ZodOptional<z.ZodString>;
    backgroundStyle: z.ZodOptional<z.ZodEnum<{
        BLUR: "BLUR";
        OFF: "OFF";
    }>>;
    logo: z.ZodOptional<z.ZodObject<{
        src: z.ZodURL;
        alt: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
type CustomStyles = z.infer<typeof CustomStyles>;
declare const OrderStatus: z.ZodAny;
type OrderStatus = z.infer<typeof OrderStatus>;
declare const PaymentCategoryOrder: z.ZodArray<z.ZodEnum<{
    wallet: "wallet";
    "open-wallet": "open-wallet";
    exchange: "exchange";
    "open-exchange": "open-exchange";
    cash: "cash";
    "open-cash": "open-cash";
    deposit: "deposit";
}>>;
type PaymentCategoryOrder = z.infer<typeof PaymentCategoryOrder>;
declare const FontName: z.ZodEnum<{
    haffer: "haffer";
    "wudoo-mono": "wudoo-mono";
    inter: "inter";
}>;
type FontName = z.infer<typeof FontName>;
declare const HeaderTitle: z.ZodOptional<z.ZodString>;
type HeaderTitle = z.infer<typeof HeaderTitle>;
type SignMessage = (input: {
    message: string;
    ownerAddress?: Address;
}) => Promise<string>;
type SignTypedData = (input: {
    typedData: TypedData;
    ownerAddress?: Address;
}) => Promise<string>;
type SendTransaction = (transaction: TransactionRequest, chainConfig: EVMChainConfig) => Promise<TransactionReceipt>;
type WalletActionsType = {
    getAddress: () => Promise<Address>;
    signMessage?: SignMessage;
    sendTransaction?: SendTransaction;
    signTypedData?: SignTypedData;
};
type StatusCallback = (input: {
    type: string;
    payload: OrderStatus;
}) => void;
declare const PaymentsWidgetSDKParamsWithoutRolesAndFunctions: z.ZodObject<{
    onramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    offramps: z.ZodOptional<z.ZodArray<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BETA_EDGES: "BETA_EDGES";
        ORG_BETA_EDGES: "ORG_BETA_EDGES";
        ORG_EDGES: "ORG_EDGES";
    }>>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    destinationAddress: z.ZodOptional<z.ZodString>;
    widgetVersion: z.ZodOptional<z.ZodEnum<{
        1: "1";
        2: "2";
    }>>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        componentShadow: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        textMode: z.ZodOptional<z.ZodEnum<{
            DEFAULT: "DEFAULT";
            ALL_UPPERCASE: "ALL_UPPERCASE";
        }>>;
        paymentCategoryGrouping: z.ZodOptional<z.ZodEnum<{
            ATTACHED: "ATTACHED";
            BUTTON: "BUTTON";
        }>>;
        fontWeight: z.ZodOptional<z.ZodEnum<{
            AUTO: "AUTO";
            MEDIUM: "MEDIUM";
        }>>;
        baseFontSize: z.ZodOptional<z.ZodString>;
        baseBorderRadius: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
        logo: z.ZodOptional<z.ZodObject<{
            src: z.ZodURL;
            alt: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    windowType: z.ZodOptional<z.ZodEnum<{
        EMBED: "EMBED";
        POPUP: "POPUP";
        MODAL: "MODAL";
    }>>;
    redirects: z.ZodOptional<z.ZodObject<{
        redirectUrl: z.ZodURL;
        ctaText: z.ZodString;
        secondaryRedirectUrl: z.ZodOptional<z.ZodURL>;
        secondaryCtaText: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    paymentCategoryOrder: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        wallet: "wallet";
        "open-wallet": "open-wallet";
        exchange: "exchange";
        "open-exchange": "open-exchange";
        cash: "cash";
        "open-cash": "open-cash";
        deposit: "deposit";
    }>>>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    showSkeleton: z.ZodOptional<z.ZodBoolean>;
    skeletonBackgroundColor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const PaymentsWidgetSDKParams: z.ZodObject<{
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        componentShadow: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        textMode: z.ZodOptional<z.ZodEnum<{
            DEFAULT: "DEFAULT";
            ALL_UPPERCASE: "ALL_UPPERCASE";
        }>>;
        paymentCategoryGrouping: z.ZodOptional<z.ZodEnum<{
            ATTACHED: "ATTACHED";
            BUTTON: "BUTTON";
        }>>;
        fontWeight: z.ZodOptional<z.ZodEnum<{
            AUTO: "AUTO";
            MEDIUM: "MEDIUM";
        }>>;
        baseFontSize: z.ZodOptional<z.ZodString>;
        baseBorderRadius: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
        logo: z.ZodOptional<z.ZodObject<{
            src: z.ZodURL;
            alt: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    windowType: z.ZodOptional<z.ZodEnum<{
        EMBED: "EMBED";
        POPUP: "POPUP";
        MODAL: "MODAL";
    }>>;
    redirects: z.ZodOptional<z.ZodObject<{
        redirectUrl: z.ZodURL;
        ctaText: z.ZodString;
        secondaryRedirectUrl: z.ZodOptional<z.ZodURL>;
        secondaryCtaText: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    statusCallback: z.ZodOptional<z.ZodAny>;
    owner: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
    }, z.core.$strip>>;
    funder: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
    }, z.core.$strip>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BETA_EDGES: "BETA_EDGES";
        ORG_BETA_EDGES: "ORG_BETA_EDGES";
        ORG_EDGES: "ORG_EDGES";
    }>>>;
    paymentCategoryOrder: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        wallet: "wallet";
        "open-wallet": "open-wallet";
        exchange: "exchange";
        "open-exchange": "open-exchange";
        cash: "cash";
        "open-cash": "open-cash";
        deposit: "deposit";
    }>>>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    onramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    showSkeleton: z.ZodOptional<z.ZodBoolean>;
    skeletonBackgroundColor: z.ZodOptional<z.ZodString>;
    offramps: z.ZodOptional<z.ZodArray<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    destinationAddress: z.ZodOptional<z.ZodString>;
    widgetVersion: z.ZodOptional<z.ZodEnum<{
        1: "1";
        2: "2";
    }>>;
}, z.core.$strip>;
type PaymentsWidgetSDKParams = z.input<typeof PaymentsWidgetSDKParamsWithoutRolesAndFunctions> & {
    owner?: Omit<WalletActionsType, "getAddress"> & {
        address: Address;
    };
    funder?: Omit<WalletActionsType, "getAddress"> & {
        address: Address;
    };
    statusCallback?: StatusCallback;
};
declare const AppMode: z.ZodEnum<{
    EMBED: "EMBED";
    MODAL: "MODAL";
    FULL: "FULL";
    OVERLAY: "OVERLAY";
}>;
type AppMode = z.infer<typeof AppMode>;
declare const PaymentsWidgetQueryParams: z.ZodObject<{
    ownerAddress: z.ZodOptional<z.ZodString>;
    funderAddress: z.ZodOptional<z.ZodString>;
    appMode: z.ZodOptional<z.ZodEnum<{
        EMBED: "EMBED";
        MODAL: "MODAL";
        FULL: "FULL";
        OVERLAY: "OVERLAY";
    }>>;
    apiBaseUrl: z.ZodOptional<z.ZodString>;
    hasOwner: z.ZodBoolean;
    hasTxHandler: z.ZodBoolean;
    hostOrigin: z.ZodNullable<z.ZodURL>;
    ipAddress: z.ZodOptional<z.ZodUnion<readonly [z.ZodIPv4, z.ZodIPv6]>>;
    featureFlags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    onramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    offramps: z.ZodOptional<z.ZodArray<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BETA_EDGES: "BETA_EDGES";
        ORG_BETA_EDGES: "ORG_BETA_EDGES";
        ORG_EDGES: "ORG_EDGES";
    }>>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    destinationAddress: z.ZodOptional<z.ZodString>;
    widgetVersion: z.ZodOptional<z.ZodEnum<{
        1: "1";
        2: "2";
    }>>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        componentShadow: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        textMode: z.ZodOptional<z.ZodEnum<{
            DEFAULT: "DEFAULT";
            ALL_UPPERCASE: "ALL_UPPERCASE";
        }>>;
        paymentCategoryGrouping: z.ZodOptional<z.ZodEnum<{
            ATTACHED: "ATTACHED";
            BUTTON: "BUTTON";
        }>>;
        fontWeight: z.ZodOptional<z.ZodEnum<{
            AUTO: "AUTO";
            MEDIUM: "MEDIUM";
        }>>;
        baseFontSize: z.ZodOptional<z.ZodString>;
        baseBorderRadius: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
        logo: z.ZodOptional<z.ZodObject<{
            src: z.ZodURL;
            alt: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    windowType: z.ZodOptional<z.ZodEnum<{
        EMBED: "EMBED";
        POPUP: "POPUP";
        MODAL: "MODAL";
    }>>;
    redirects: z.ZodOptional<z.ZodObject<{
        redirectUrl: z.ZodURL;
        ctaText: z.ZodString;
        secondaryRedirectUrl: z.ZodOptional<z.ZodURL>;
        secondaryCtaText: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    paymentCategoryOrder: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        wallet: "wallet";
        "open-wallet": "open-wallet";
        exchange: "exchange";
        "open-exchange": "open-exchange";
        cash: "cash";
        "open-cash": "open-cash";
        deposit: "deposit";
    }>>>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    showSkeleton: z.ZodOptional<z.ZodBoolean>;
    skeletonBackgroundColor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type PaymentsWidgetQueryParams = z.infer<typeof PaymentsWidgetQueryParams>;
declare enum MessageType {
    ACTION_TRANSACTION = "ACTION_TRANSACTION",
    EVENT_ORDER_STATUS = "EVENT_ORDER_STATUS",
    EVENT_WINDOW_CLOSE = "EVENT_WINDOW_CLOSE",
    ACTION_SIGN_MESSAGE = "ACTION_SIGN_MESSAGE",
    ACTION_PROVIDER_WIDGET = "ACTION_PROVIDER_WIDGET",
    ACTION_SIGN_TYPED_DATA = "ACTION_SIGN_TYPED_DATA",
    EVENT_RESIZE = "EVENT_RESIZE"
}
type Message = {
    type: MessageType.ACTION_TRANSACTION;
    payload: {
        transaction: TransactionRequest;
        messageId: string;
        chainConfig: EVMChainConfig;
    };
} | {
    type: MessageType.EVENT_ORDER_STATUS;
    payload: OrderStatus;
} | {
    type: MessageType.EVENT_WINDOW_CLOSE;
    payload: undefined;
} | {
    type: MessageType.ACTION_SIGN_MESSAGE;
    payload: {
        message: string;
        messageId: string;
        ownerAddress?: Address;
    };
} | {
    type: MessageType.ACTION_PROVIDER_WIDGET;
    payload: {
        providerWidgetMode: "REDIRECT" | "POPUP";
        redirectUrl: string;
        url: string;
        workflowId: string;
    };
} | {
    type: MessageType.ACTION_SIGN_TYPED_DATA;
    payload: {
        typedData: TypedData;
        messageId: string;
        ownerAddress?: Address;
    };
} | {
    type: MessageType.EVENT_RESIZE;
    payload: {
        width?: number;
        height?: number;
    };
};
type MessageResponse = {
    type: MessageType.ACTION_TRANSACTION;
    payload: {
        messageId: string;
        txReceipt: TransactionReceipt;
        error: null;
    } | {
        messageId: string;
        txReceipt: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_SIGN_MESSAGE;
    payload: {
        messageId: string;
        signature: string;
        error: null;
    } | {
        messageId: string;
        signature: null;
        error: string;
    };
} | {
    type: MessageType.ACTION_SIGN_TYPED_DATA;
    payload: {
        messageId: string;
        signature: string;
        error: null;
    } | {
        messageId: string;
        signature: null;
        error: string;
    };
};
/**
 * Configuration for initializeClient.
 *
 * This is intentionally minimal - init is just for preloading.
 * All business logic params (outputs, customStyles, etc.) go in openHallidayPayments.
 */
declare const InitConfig: z.ZodObject<{
    apiKey: z.ZodString;
    sandbox: z.ZodOptional<z.ZodBoolean>;
    onReady: z.ZodOptional<z.ZodAny>;
    onError: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
type InitConfig = z.input<typeof InitConfig> & {
    onReady?: () => void;
    onError?: (error: Error) => void;
};

/**
 * Opens the Halliday Payments widget.
 *
 * This function initializes and opens the payment widget window in a popup or embedded mode.
 *
 * @param {PaymentsWidgetSDKParams} params The configurations for the payments widget, which includes:
 *
 * @param {!string} params.apiKey {string} Your API key for authorization.
 * @param {boolean=} params.sandbox {boolean} (optional) Whether the widget is in sandbox mode.
 * @param {string=} params.destinationAddress {string} (optional) The address of the destination of the widget.
 *
 * @param {Asset[]=} params.inputs {{@link Asset}[]} (optional) The input assets for the widget.
 * @param {Asset[]=} params.outputs {{@link Asset}[]} (optional) The output assets for the widget.
 * @param {string[]=} params.onramps {string[]} (optional) Array of onramp provider names to filter/display in the widget.
 * @param {RampName[]=} params.onramps {{@link RampName}[]} (optional) The onramps for the widget.
 * @param {RampName[]=} params.offramps {{@link RampName}[]} (optional) The offramps for the widget.
 *
 * @param {CustomStyles=} params.customStyles {{@link CustomStyles}} (optional) A list of custom styles to show in the widget.
 * @param {string=} params.targetElementId {string} (required if windowType is "EMBED") The ID of the DOM element where the widget should be embedded.
 * @param {("POPUP" | "EMBED")=} params.windowType {"POPUP" | "EMBED"} The desired display mode of the widget.
 *
 * @param {Role=} params.owner {{@link Role}} (optional) The owner that would have full access to payments workflow.
 * @param {Role=} params.funder {{@link Role}} (optional) The funder that initiates the funding.
 * @param {PaymentCategoryOrder=} params.paymentCategoryOrder {{@link PaymentCategoryOrder}} (optional) On the quote page, these are three displayed paymentcategories (empty or three elements).
 * @param {FontName=} params.fontName {{@link FontName}} (optional) The font name to use in the widget (haffer or wudoo-mono or inter). Defaults to haffer.
 * @param {HeaderTitle=} params.headerTitle {{@link HeaderTitle}} (optional) The header title to use in the widget (Buy or string). Defaults to Buy.
 *
 * @param {StatusCallback=} params.statusCallback {{@link StatusCallback}} (optional) Callback to receive status events.
 */
declare function openHallidayPayments(params: PaymentsWidgetSDKParams, ...args: any[]): Promise<void>;

/**
 * Serialize the query params to a base64 string.
 *
 * @param {PaymentsWidgetQueryParams} data {{@link PaymentsWidgetQueryParams}} The query params to serialize.
 * @returns The serialized (base64) query params
 */
declare const serializeQueryParams: (data: PaymentsWidgetQueryParams) => string;
/**
 * Deserialize the query params from a base64 string.
 *
 * @param {string} serialized The base64 string to deserialize.
 * @returns {{@link PaymentsWidgetQueryParams}} The deserialized query params.
 */
declare const deserializeQueryParams: (serialized: string) => PaymentsWidgetQueryParams;
/**
 * Get the URL for the payments widget.
 *
 * @param {PaymentsWidgetQueryParams & { windowOrigin?: string }} params {{@link PaymentsWidgetQueryParams}} The query params to serialize.
 * @returns The URL for the payments widget.
 */
declare const getPaymentsWidgetUrl: (params: PaymentsWidgetQueryParams & {
    windowOrigin?: string;
}) => string;

/**
 * Initialize and preload the Halliday Payments widget.
 *
 * This loads the widget in a hidden iframe so that when you call
 * `openHallidayPayments()`, it appears instantly - no loading, no delay.
 *
 * @param config Configuration with apiKey and optional callbacks
 * @returns Promise that resolves when widget is fully loaded and ready
 *
 * @example
 * ```javascript
 * // Initialize early in your app
 * await initializeClient({
 *   apiKey: 'your-api-key',
 *   onReady: () => console.log('Widget fully loaded!'),
 *   onError: (err) => console.error('Failed to load:', err),
 * });
 *
 * // Later, when user clicks "Pay" - opens INSTANTLY
 * openHallidayPayments({
 *   apiKey: 'your-api-key',
 *   windowType: 'MODAL',
 *   outputs: ['ethereum:usdc'],
 * });
 * ```
 */
declare const initializeClient: (config: InitConfig, ...args: any[]) => Promise<void>;
/**
 * Destroy the preloaded widget and reset state.
 * Call this when you need to re-initialize with different settings.
 */
declare const destroyClient: () => void;

export { AppMode, BackgroundStyle, BorderStyle, CssFontSize, CustomStyles, FontName, FontWeight, HeaderTitle, InitConfig, MessageType, OrderStatus, PaymentCategoryGrouping, PaymentCategoryOrder, PaymentsWidgetQueryParams, PaymentsWidgetSDKParams, TextMode, WindowType, deserializeQueryParams, destroyClient, getPaymentsWidgetUrl, initializeClient, openHallidayPayments, serializeQueryParams };
export type { Message, MessageResponse };
