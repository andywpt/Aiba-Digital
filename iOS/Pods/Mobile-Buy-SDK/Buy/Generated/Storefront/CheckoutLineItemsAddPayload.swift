//
//  CheckoutLineItemsAddPayload.swift
//  Buy
//
//  Created by Shopify.
//  Copyright (c) 2017 Shopify Inc. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import Foundation

extension Storefront {
	/// Return type for `checkoutLineItemsAdd` mutation. 
	open class CheckoutLineItemsAddPayloadQuery: GraphQL.AbstractQuery, GraphQLQuery {
		public typealias Response = CheckoutLineItemsAddPayload

		/// The updated checkout object. 
		@discardableResult
		open func checkout(alias: String? = nil, _ subfields: (CheckoutQuery) -> Void) -> CheckoutLineItemsAddPayloadQuery {
			let subquery = CheckoutQuery()
			subfields(subquery)

			addField(field: "checkout", aliasSuffix: alias, subfields: subquery)
			return self
		}

		/// The list of errors that occurred from executing the mutation. 
		@discardableResult
		open func checkoutUserErrors(alias: String? = nil, _ subfields: (CheckoutUserErrorQuery) -> Void) -> CheckoutLineItemsAddPayloadQuery {
			let subquery = CheckoutUserErrorQuery()
			subfields(subquery)

			addField(field: "checkoutUserErrors", aliasSuffix: alias, subfields: subquery)
			return self
		}

		/// The list of errors that occurred from executing the mutation. 
		@available(*, deprecated, message:"Use `checkoutUserErrors` instead.")
		@discardableResult
		open func userErrors(alias: String? = nil, _ subfields: (UserErrorQuery) -> Void) -> CheckoutLineItemsAddPayloadQuery {
			let subquery = UserErrorQuery()
			subfields(subquery)

			addField(field: "userErrors", aliasSuffix: alias, subfields: subquery)
			return self
		}
	}

	/// Return type for `checkoutLineItemsAdd` mutation. 
	open class CheckoutLineItemsAddPayload: GraphQL.AbstractResponse, GraphQLObject {
		public typealias Query = CheckoutLineItemsAddPayloadQuery

		internal override func deserializeValue(fieldName: String, value: Any) throws -> Any? {
			let fieldValue = value
			switch fieldName {
				case "checkout":
				if value is NSNull { return nil }
				guard let value = value as? [String: Any] else {
					throw SchemaViolationError(type: CheckoutLineItemsAddPayload.self, field: fieldName, value: fieldValue)
				}
				return try Checkout(fields: value)

				case "checkoutUserErrors":
				guard let value = value as? [[String: Any]] else {
					throw SchemaViolationError(type: CheckoutLineItemsAddPayload.self, field: fieldName, value: fieldValue)
				}
				return try value.map { return try CheckoutUserError(fields: $0) }

				case "userErrors":
				guard let value = value as? [[String: Any]] else {
					throw SchemaViolationError(type: CheckoutLineItemsAddPayload.self, field: fieldName, value: fieldValue)
				}
				return try value.map { return try UserError(fields: $0) }

				default:
				throw SchemaViolationError(type: CheckoutLineItemsAddPayload.self, field: fieldName, value: fieldValue)
			}
		}

		/// The updated checkout object. 
		open var checkout: Storefront.Checkout? {
			return internalGetCheckout()
		}

		func internalGetCheckout(alias: String? = nil) -> Storefront.Checkout? {
			return field(field: "checkout", aliasSuffix: alias) as! Storefront.Checkout?
		}

		/// The list of errors that occurred from executing the mutation. 
		open var checkoutUserErrors: [Storefront.CheckoutUserError] {
			return internalGetCheckoutUserErrors()
		}

		func internalGetCheckoutUserErrors(alias: String? = nil) -> [Storefront.CheckoutUserError] {
			return field(field: "checkoutUserErrors", aliasSuffix: alias) as! [Storefront.CheckoutUserError]
		}

		/// The list of errors that occurred from executing the mutation. 
		@available(*, deprecated, message:"Use `checkoutUserErrors` instead.")
		open var userErrors: [Storefront.UserError] {
			return internalGetUserErrors()
		}

		func internalGetUserErrors(alias: String? = nil) -> [Storefront.UserError] {
			return field(field: "userErrors", aliasSuffix: alias) as! [Storefront.UserError]
		}

		internal override func childResponseObjectMap() -> [GraphQL.AbstractResponse]  {
			var response: [GraphQL.AbstractResponse] = []
			objectMap.keys.forEach {
				switch($0) {
					case "checkout":
					if let value = internalGetCheckout() {
						response.append(value)
						response.append(contentsOf: value.childResponseObjectMap())
					}

					case "checkoutUserErrors":
					internalGetCheckoutUserErrors().forEach {
						response.append($0)
						response.append(contentsOf: $0.childResponseObjectMap())
					}

					case "userErrors":
					internalGetUserErrors().forEach {
						response.append($0)
						response.append(contentsOf: $0.childResponseObjectMap())
					}

					default:
					break
				}
			}
			return response
		}
	}
}
