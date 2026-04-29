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

type TypedData = string;
declare const WindowType: z.ZodEnum<{
    MODAL: "MODAL";
    EMBED: "EMBED";
}>;
type WindowType = z.infer<typeof WindowType>;
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
    borderStyle: z.ZodOptional<z.ZodEnum<{
        SQUARE: "SQUARE";
        DEFAULT: "DEFAULT";
    }>>;
    successColor: z.ZodOptional<z.ZodString>;
    alertColor: z.ZodOptional<z.ZodString>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    componentShadow: z.ZodOptional<z.ZodString>;
    backgroundStyle: z.ZodOptional<z.ZodEnum<{
        BLUR: "BLUR";
        OFF: "OFF";
    }>>;
}, z.core.$strip>;
type CustomStyles = z.infer<typeof CustomStyles>;
declare const OrderStatus: z.ZodAny;
type OrderStatus = z.infer<typeof OrderStatus>;
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
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userWalletFunderDisplay: z.ZodOptional<z.ZodEnum<{
        SHOW: "SHOW";
        HIDE: "HIDE";
    }>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    onReady: z.ZodOptional<z.ZodAny>;
    onError: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
declare const PaymentsWidgetSDKParams: z.ZodObject<{
    apiKey: z.ZodString;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userWalletFunderDisplay: z.ZodOptional<z.ZodEnum<{
        SHOW: "SHOW";
        HIDE: "HIDE";
    }>>;
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
    userWallet: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        signMessage: z.ZodOptional<z.ZodAny>;
        sendTransaction: z.ZodOptional<z.ZodAny>;
        signTypedData: z.ZodOptional<z.ZodAny>;
        connect: z.ZodOptional<z.ZodAny>;
    }, z.core.$strip>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    onReady: z.ZodOptional<z.ZodAny>;
    onError: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
type PaymentsWidgetSDKParams = z.input<typeof PaymentsWidgetSDKParamsWithoutRolesAndFunctions> & {
    owner?: Omit<WalletActionsType, "getAddress"> & {
        address: Address;
    };
    funder?: Omit<WalletActionsType, "getAddress"> & {
        address: Address;
    };
    userWallet: Omit<WalletActionsType, "getAddress"> & {
        address: Address;
        connect?: () => void;
    };
    statusCallback?: StatusCallback;
    onReady?: () => void;
    onError?: (error: Error) => void;
};
declare const AppMode: z.ZodEnum<{
    FULL: "FULL";
    MODAL: "MODAL";
    OVERLAY: "OVERLAY";
    EMBED: "EMBED";
}>;
type AppMode = z.infer<typeof AppMode>;
declare const PaymentsWidgetQueryParams: z.ZodObject<{
    appMode: z.ZodOptional<z.ZodEnum<{
        FULL: "FULL";
        MODAL: "MODAL";
        OVERLAY: "OVERLAY";
        EMBED: "EMBED";
    }>>;
    apiBaseUrl: z.ZodOptional<z.ZodString>;
    hasOwner: z.ZodBoolean;
    hasTxHandler: z.ZodBoolean;
    hasConnect: z.ZodBoolean;
    hostOrigin: z.ZodNullable<z.ZodURL>;
    ipAddress: z.ZodOptional<z.ZodUnion<readonly [z.ZodIPv4, z.ZodIPv6]>>;
    featureFlags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    ownerAddress: z.ZodOptional<z.ZodString>;
    funderAddress: z.ZodOptional<z.ZodString>;
    onramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    offramps: z.ZodOptional<z.ZodArray<z.ZodString>>;
    inputs: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>>;
    features: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BETA_EDGES: "BETA_EDGES";
        ORG_BETA_EDGES: "ORG_BETA_EDGES";
        ORG_EDGES: "ORG_EDGES";
    }>>>;
    hops: z.ZodOptional<z.ZodArray<z.ZodString>>;
    sandbox: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    outputs: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodString]>>;
    apiKey: z.ZodString;
    customStyles: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        textSecondaryColor: z.ZodOptional<z.ZodString>;
        accentColor: z.ZodOptional<z.ZodString>;
        borderStyle: z.ZodOptional<z.ZodEnum<{
            SQUARE: "SQUARE";
            DEFAULT: "DEFAULT";
        }>>;
        successColor: z.ZodOptional<z.ZodString>;
        alertColor: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        componentShadow: z.ZodOptional<z.ZodString>;
        backgroundStyle: z.ZodOptional<z.ZodEnum<{
            BLUR: "BLUR";
            OFF: "OFF";
        }>>;
    }, z.core.$strip>>;
    targetElementId: z.ZodOptional<z.ZodString>;
    fontName: z.ZodOptional<z.ZodEnum<{
        haffer: "haffer";
        "wudoo-mono": "wudoo-mono";
        inter: "inter";
    }>>;
    headerTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userWalletFunderDisplay: z.ZodOptional<z.ZodEnum<{
        SHOW: "SHOW";
        HIDE: "HIDE";
    }>>;
    destinationAddress: z.ZodOptional<z.ZodString>;
    onReady: z.ZodOptional<z.ZodAny>;
    onError: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
type PaymentsWidgetQueryParams = z.infer<typeof PaymentsWidgetQueryParams>;
declare enum MessageType {
    ACTION_TRANSACTION = "ACTION_TRANSACTION",
    EVENT_ORDER_STATUS = "EVENT_ORDER_STATUS",
    EVENT_WINDOW_CLOSE = "EVENT_WINDOW_CLOSE",
    ACTION_SIGN_MESSAGE = "ACTION_SIGN_MESSAGE",
    ACTION_PROVIDER_WIDGET = "ACTION_PROVIDER_WIDGET",
    ACTION_SIGN_TYPED_DATA = "ACTION_SIGN_TYPED_DATA",
    ACTION_TRIGGER_CONNECT = "ACTION_TRIGGER_CONNECT",
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
    type: MessageType.ACTION_TRIGGER_CONNECT;
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
declare enum WidgetLoadFailureReason {
    /** Host page's Content-Security-Policy blocked the iframe src */
    CSP_BLOCKED = "CSP_BLOCKED",
    /** Network failure: DNS, firewall, proxy, or server unreachable */
    NETWORK_FAILURE = "NETWORK_FAILURE",
    /** The iframe element was removed from the DOM by external code */
    IFRAME_REMOVED = "IFRAME_REMOVED",
    /** A browser extension or privacy tool blocked the request */
    RESOURCE_BLOCKED = "RESOURCE_BLOCKED",
    /** Unable to determine the specific failure reason */
    UNKNOWN = "UNKNOWN"
}
type WidgetLoadDiagnostics = {
    onloadFired: boolean;
    cspViolationDetected: boolean;
    cspBlockedURI: string | null;
    iframeInDOM: boolean;
    resourceTimingEntryExists: boolean;
    elapsedMs: number;
};
declare class WidgetLoadError extends Error {
    name: "WidgetLoadError";
    readonly reason: WidgetLoadFailureReason;
    readonly diagnostics: WidgetLoadDiagnostics;
    constructor(message: string, reason: WidgetLoadFailureReason, diagnostics: WidgetLoadDiagnostics);
    static isWidgetLoadError(error: unknown): error is WidgetLoadError;
}

/**
 * Opens the Halliday Payments widget.
 *
 * @param {PaymentsWidgetSDKParams} params The configurations for the payments widget
 */
declare function openHallidayPayments(params: PaymentsWidgetSDKParams, ...args: any[]): void;

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
 * @param params Configuration with apiKey, optional callbacks (onReady, onError), and any business params
 *
 * @example
 * ```javascript
 * // Initialize early in your app
 * initializeClient({
 *   apiKey: 'your-api-key',
 *   outputs: ['ethereum:usdc'],
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
declare const initializeClient: (params: PaymentsWidgetSDKParams, ...args: any[]) => void;
/**
 * Destroy the preloaded widget and reset state.
 * Call this when you need to re-initialize with different settings.
 */
declare const destroyClient: () => void;

declare function openActivity(): void;

export { AppMode, BackgroundStyle, BorderStyle, CssFontSize, CustomStyles, FontName, HeaderTitle, MessageType, OrderStatus, PaymentsWidgetQueryParams, PaymentsWidgetSDKParams, WidgetLoadError, WidgetLoadFailureReason, WindowType, deserializeQueryParams, destroyClient, getPaymentsWidgetUrl, initializeClient, openActivity, openHallidayPayments, serializeQueryParams };
export type { Message, MessageResponse, WidgetLoadDiagnostics };
