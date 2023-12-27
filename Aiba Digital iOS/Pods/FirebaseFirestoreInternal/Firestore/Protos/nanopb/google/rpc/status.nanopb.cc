/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Automatically generated nanopb constant definitions */
/* Generated by nanopb-0.3.9.8 */

#include "status.nanopb.h"

#include "Firestore/core/src/nanopb/pretty_printing.h"

namespace firebase {
namespace firestore {

using nanopb::PrintEnumField;
using nanopb::PrintHeader;
using nanopb::PrintMessageField;
using nanopb::PrintPrimitiveField;
using nanopb::PrintTail;

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif



const pb_field_t google_rpc_Status_fields[4] = {
    PB_FIELD(  1, INT32   , SINGULAR, STATIC  , FIRST, google_rpc_Status, code, code, 0),
    PB_FIELD(  2, BYTES   , SINGULAR, POINTER , OTHER, google_rpc_Status, message, code, 0),
    PB_FIELD(  3, MESSAGE , REPEATED, POINTER , OTHER, google_rpc_Status, details, message, &google_protobuf_Any_fields),
    PB_LAST_FIELD
};


std::string google_rpc_Status::ToString(int indent) const {
    std::string tostring_header = PrintHeader(indent, "Status", this);
    std::string tostring_result;

    tostring_result += PrintPrimitiveField("code: ", code, indent + 1, false);
    tostring_result += PrintPrimitiveField("message: ",
        message, indent + 1, false);
    for (pb_size_t i = 0; i != details_count; ++i) {
        tostring_result += PrintMessageField("details ",
            details[i], indent + 1, true);
    }

    bool is_root = indent == 0;
    if (!tostring_result.empty() || is_root) {
      std::string tostring_tail = PrintTail(indent);
      return tostring_header + tostring_result + tostring_tail;
    } else {
      return "";
    }
}

}  // namespace firestore
}  // namespace firebase

/* @@protoc_insertion_point(eof) */
